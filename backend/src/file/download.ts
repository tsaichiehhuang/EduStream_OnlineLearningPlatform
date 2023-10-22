import path from "path";

import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";

import { KK_API_ENDPOINT, staticRoot } from "../utils/constant";
import { File } from "../models/file";

async function kkDownload(fileId: string) {
  return (
    await axios.post(
      `cms/v1/library/files/${fileId}:download`,
      {},
      {
        baseURL: KK_API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "x-bv-org-id": process.env.X_BV_ORG_ID,
        },
      }
    )
  ).data;
}

export const download = (app: Elysia) =>
  app.get(
    "/:fileId",
    async ({ params: { fileId }, set }) => {
      const dbFile = await File.findOneBy({ id: fileId });
      if (dbFile === null) {
        set.status = 404;
        return "File not found";
      }
      if (dbFile.location === "kkCompany") {
        try {
          const { download_uri, download_filename } = await kkDownload(fileId);
          set.redirect = download_uri;
          return;
        } catch (err) {
          if (err instanceof AxiosError) {
            if (err.response?.status === 400 || err.response?.status === 404) {
              set.status = err.response.status;
              return err.response?.data?.message;
            }
          } else {
            console.error(
              "Unknown error occurred when downloading file",
              fileId
            );
            console.error(err);
            throw err;
          }
        }
      } else {
        if (dbFile.path === undefined) {
          set.status = 400;
          return "file not uploaded";
        }

        const diskFile = Bun.file(path.resolve(staticRoot, dbFile.path));

        if (await diskFile.exists()) {
          return diskFile;
        } else {
          console.error("file lost!!");
          console.error(`\tCan't find file ${fileId}`);
          console.error(`\tIt should be located in ${dbFile.path}`);
          throw new Error("file not found on server");
        }
      }
    },
    {
      params: t.Object({
        fileId: t.String({
          format: "uuid",
          default: "00000000-0000-0000-0000-000000000000",
        }),
      }),
      response: {
        200: t.Union([t.File(), t.Undefined()]),
      },
    }
  );
