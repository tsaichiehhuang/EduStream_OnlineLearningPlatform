import axios, { AxiosError, AxiosResponse } from "axios";

import { IKKFileUploadComplete } from "../../types/type";
import { KK_API_ENDPOINT } from "../../util/constant";
import { File } from "../../models/file";

// all planed errors in this function
export class KKUploadError extends Error {
  private _response?: AxiosResponse;

  constructor(message?: string, response?: AxiosResponse) {
    super(message);
    this._response = response;
  }

  public get response() {
    return this._response;
  }
}

export class AlreadyUploadedError extends KKUploadError {}

export class FileNotFoundError extends KKUploadError {}

export class IsLocalError extends KKUploadError {}

export class InvalidArgs extends KKUploadError {}

export async function complete({
  id,
  uploadId,
  checksum_sha1,
  parts,
}: IKKFileUploadComplete) {
  const file = await File.findOneBy({ id: id });
  if (file != null) {
    if (file.location === "local") {
      throw new IsLocalError();
    } else if (file.location === "kkCompany") {
      throw new AlreadyUploadedError();
    }
  }
  try {
    await axios.post(
      `cms/v1/library/files/${id}:complete-upload`,
      {
        complete_data: {
          id: uploadId,
          checksum_sha1: checksum_sha1,
          parts: parts,
        },
      },
      {
        baseURL: KK_API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "x-bv-org-id": process.env.X_BV_ORG_ID,
        },
      }
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      if (
        err.response?.status === 404 ||
        (err.response?.status === 500 &&
          typeof err.response?.data?.message === "string" &&
          (err.response.data.message as string).includes(
            "https response error StatusCode: 404"
          ))
      ) {
        throw new FileNotFoundError(err.response.data?.message, err.response);
      }
      if (
        err.response?.status === 500 &&
        typeof err.response.data?.message === "string" &&
        (err.response.data.message as string)?.includes(
          "file already completed"
        )
      ) {
        throw new AlreadyUploadedError(
          err.response.data?.message,
          err.response
        );
      }
      if (
        err.response?.status === 500 &&
        typeof err.response.data?.message === "string" &&
        (err.response.data.message as string)?.includes(
          "https response error StatusCode: 400"
        )
      ) {
        throw new InvalidArgs("Invalid args sent to remote", err.response);
      }
      throw new KKUploadError(
        "Unknown error from KK. Check response for details",
        err.response
      );
    } else {
      console.error("unknown error occurred when completing file upload");
      throw err;
    }
  }
}

// example usage
/* export const comp = (app: Elysia) =>
  app.post(
    "/complete",
    async function ({ body, set }) {
      try {
        await complete(body);
      } catch (err) {
        if (err instanceof KKUploadError) {
          if (err instanceof AlreadyUploadedError) {
            set.status = 400;
            return "already upload";
          } else if (err instanceof FileNotFoundError) {
            set.status = 404;
            return "file not found";
          } else if (err instanceof IsLocalError) {
            set.status = 400;
            return "local file";
          } else if (err instanceof InvalidArgs) {
            set.status = 400;
            return "Invalid args sent to remote";
          }
          throw err;
        } else {
          console.error("unknown error in complete\n", err);
          throw err;
        }
      }
    },
    {
      body: KKFileUploadComplete,
    }
  ); */
