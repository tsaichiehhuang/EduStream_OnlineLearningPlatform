import { Elysia, t } from "elysia";
import { complete } from "../file/upload/complete";
import {
  KKUploadError,
  AlreadyUploadedError,
  FileNotFoundError,
  InvalidArgs,
} from "../file/upload/complete";
import { AuthType, BlockType, KKFileUploadComplete } from "../types/type";
import { createBlock } from "./block";
import { File } from "../models/file";

export const createFile = (app: AuthType) =>
  app.post(
    "/file",
    async function ({ body, set }) {
      try {
        await complete(body.file);

        // create block
        await createBlock(BlockType.File, body.file.id, Number(body.sectionId));

        return {
          data: {
            file: {
              id: body.file.id,
            },
          },
        };
      } catch (err) {
        if (err instanceof KKUploadError) {
          if (err instanceof AlreadyUploadedError) {
            set.status = 400;
            return "already upload";
          } else if (err instanceof FileNotFoundError) {
            set.status = 404;
            return "file not found";
          } else if (err instanceof InvalidArgs) {
            set.status = 400;
            return "Invalid args sent to remote";
          }
          throw err;
        } else {
          throw err;
        }
      }
    },
    {
      body: t.Object({
        file: KKFileUploadComplete,
        sectionId: t.Numeric(),
      }),
    }
  );

export const removeFile = (app: Elysia) =>
  app.delete(
    "/file/:id",
    async ({ params: { id }, set }) => {
      try {
        const file = await File.findOneBy({ id: id });
        if (!file) {
          set.status = 404;
          return "File Not Found";
        }
        await file.remove();
        return {
          data: {
            file: {
              id: id,
            },
          },
        };
      } catch (err) {
        set.status = 500;
        console.log(err);
        return "Query Failed";
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
