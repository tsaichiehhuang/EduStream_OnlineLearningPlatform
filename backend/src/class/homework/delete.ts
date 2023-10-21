import { Elysia, t } from "elysia";
import { Submission } from "../../models/submission";
import { File } from "../../models/file"
import axios, { AxiosError } from "axios";

export const deleteHomework = (app: Elysia) =>
  app.delete(
    "/",
    async ({ profile, body, set }) => {

        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        try {
            await Submission.createQueryBuilder("submission")
            .delete()
            .where({
                fileId: body.id
            })
            .execute();

            const file = await File.findOneBy({ id: body.id })
            if (!file) {
                set.status = 404;
                return "File Not Found";
            } else if (file.location == 'kkCompany') {
                console.warn("KK File：",file)
                const access_token = process.env.API_TOKEN;
                await (async function () {
                    try {
                      return (
                        await axios.delete(
                            `cms/v1/library/files/${body.id}`,
                            {
                                baseURL: "https://api.one-stage.kkstream.io/bv/",
                                headers: {
                                Authorization: `Bearer ${access_token}`,
                                "x-bv-org-id": process.env.X_BV_ORG_ID,
                                },
                            }
                        )
                      ).data;
                    } catch (err) {
                        console.warn(
                            "Error status：",
                            err.response?.status,
                            "Reason：",
                            err.response?.statusText
                        );
                        console.warn("Details：", err.response?.data);
                        set.status = err.response?.status
                        return "File delete from KK failed.";
                    }
                })();
            } 
            await File.createQueryBuilder("file")
            .delete()
            .where({
                id: body.id
            })
            .execute();
            await Submission.createQueryBuilder("submission")
            .delete()
            .where({
                fileId: body.id
            })
            .execute();

            set.status = 200
            return {
                data: {
                    class: {
                        id: body.id
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
        id: t.String()
      }),
    }
  );
