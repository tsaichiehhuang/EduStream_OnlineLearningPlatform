import { Elysia, t } from "elysia";
import { Submission } from "../../models/submission";
import { File } from "../../models/file";
import axios, { AxiosError } from "axios";

export const deleteHomework = (app: Elysia) =>
  app.delete(
    "/:id/delete",
    async ({ profile, params, set }) => {
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      try {
        const sub = await Submission.findOneBy({
          hwId: Number(params.id),
          userId: profile.id,
        });
        if (!sub) {
          set.status = 404;
          return "Submission Not Found";
        }

        await Submission.createQueryBuilder("submission")
          .delete()
          .where({
            hwId: params.id,
            userId: profile.id,
          })
          .execute();

        const file = await File.findOneBy({ id: sub.fileId });

        if (!file) {
          set.status = 404;
          return "File Not Found";
        } else if (file.location == "kkCompany") {
          console.warn("KK File：", file);
          const access_token = process.env.API_TOKEN;
          await (async function () {
            try {
              return (
                await axios.delete(`cms/v1/library/files/${body.id}`, {
                  baseURL: "https://api.one-stage.kkstream.io/bv/",
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    "x-bv-org-id": process.env.X_BV_ORG_ID,
                  },
                })
              ).data;
            } catch (err) {
              console.warn(
                "Error status：",
                err.response?.status,
                "Reason：",
                err.response?.statusText
              );
              console.warn("Details：", err.response?.data);
              set.status = err.response?.status;
              return "File delete from KK failed.";
            }
          })();
        }
        await File.createQueryBuilder("file")
          .delete()
          .where({
            id: sub.fileId,
          })
          .execute();
        await Submission.createQueryBuilder("submission")
          .delete()
          .where({
            fileId: params.id,
          })
          .execute();

        set.status = 200;
        return {
          data: {
            class: {
              id: params.id,
            },
          },
        };
      } catch (err) {
        set.status = 500;
        return {
          api: "Delete Homework",
          error: "Delete homework from Local failed.",
        };
      }
    },
    {
      body: t.Object({
        id: t.String(),
      }),
    }
  );
