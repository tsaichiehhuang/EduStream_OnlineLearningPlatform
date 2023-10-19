import { Elysia, t } from "elysia";

import axios, { AxiosError } from "axios";

import { File } from "../../models/file";
import { KK_API_ENDPOINT } from "../../util/constant";

/**@throws AxiosError */
async function kkCancel(id: string, uploadId: string) {
  await axios.post(
    `cms/v1/library/files/${id}:cancel-upload`,
    {
      upload_id: uploadId,
    },
    {
      baseURL: KK_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
        "x-bv-org-id": process.env.X_BV_ORG_ID,
      },
    }
  );
  console.log("cancelled upload to KK with file id:", id);
}

export const cancel = (app: Elysia) =>
  app.post(
    "/cancel",
    async ({ body, set }) => {
      const file = await File.findOneBy({ id: body.id });
      if (file === null) {
        if (body.uploadId === undefined) {
          // local not found
          set.status = 404;
          return "File Not Found";
        }
        try {
          await kkCancel(body.id, body.uploadId);
          return;
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              error.response?.status === 404 ||
              (error.response?.status === 500 &&
                (error.response.data.message as string)?.includes(
                  "https response error StatusCode: 404"
                ))
            ) {
              set.status = 404;
              return "File Not Found On Remote";
            }

            if (error.response?.status === 400) {
              set.status = 400;
              return error.response.data.message;
            }

            console.error(
              "Unexpected error from KK when canceling upload occurred!"
            );
            console.error("\tError cause: ", error.cause);
            console.error("\tResponse from KK:", error.response);
          } else {
            console.error(
              "Unknown error occurred when cancelling upload to KK:",
              error
            );
          }
          set.status = 500;
          return "Unexpected error occurred";
        }
      }
      if (
        file.location === "kkCompany" ||
        (file.location === "local" && typeof file.path === "string")
      ) {
        set.status = 400;
        return "Uploaded. Can't cancel";
      }
      if (file.location === "local" && typeof body.uploadId === "string") {
        set.status = 400;
        return "Unexpected uploadId";
      }

      await file.remove();
      console.log("cancelled file upload on local with id", body.id);
    },
    {
      body: t.Object({
        id: t.String({
          format: "uuid",
          default: "00000000-0000-0000-0000-000000000000",
        }),
        uploadId: t.Optional(t.String()),
      }),
    }
  );
