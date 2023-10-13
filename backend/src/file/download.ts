import { env } from "process";
import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";

export const download = (
  config: ConstructorParameters<typeof Elysia>[0] = {}
) =>
  new Elysia(config).get(
    "/:fileId/download",
    async ({ params, set }) => {
      // TODO: wait for Anna completing login system
      const access_token = env.API_TOKEN;
      const file = await (async function () {
        try {
          return (
            await axios.post(
              `cms/v1/library/files/${params.fileId}:download`,
              {},
              {
                baseURL: "https://api.one-stage.kkstream.io/bv/",
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "x-bv-org-id": env.X_BV_ORG_ID,
                },
              }
            )
          ).data;
        } catch (err) {
          if (err instanceof AxiosError) {
            set.status = err.response?.status;
            if (set.status !== 404) {
              console.warn(
                `failed to get file ${params.fileId}:\n\treason:${err.response}`
              );
              return `Unknown error when getting the file. Status ${err.response?.status}`;
            } else {
              return "";
            }
          } else {
            set.status = "Internal Server Error";
            return "";
          }
        }
      })();

      if (typeof file === "string") {
        if (set.status === undefined) {
          set.status = "Internal Server Error";
        }
        return file;
      }
      const { download_uri, download_filename } = file;

      set.redirect = download_uri;
    },
    {
      params: t.Object({
        fileId: t.String({
          format: "uuid",
          default: "00000000-0000-0000-0000-000000000000",
        }),
      }),
    }
  );
