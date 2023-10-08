import process from "process";
import { Elysia, t } from "elysia";
import axios from "axios";

export const download = (
  config: ConstructorParameters<typeof Elysia>[0] = {}
) =>
  new Elysia(config).get(
    "/:fileId/download",
    async ({ params, set }) => {
      // TODO: wait for Anna completing login system
      const access_token = process.env.API_TOKEN;
      const { download_uri, download_filename } = (
        await axios.post(
          `cms/v1/library/files/${params.fileId}:download`,
          {},
          {
            baseURL: "https://api.one-stage.kkstream.io/bv/",
            headers: {
              Authorization: `Bearer ${access_token}`,
              "x-bv-org-id": process.env.X_BV_ORG_ID,
            },
          }
        )
      ).data;

      set.redirect = download_uri;
    },
    {
      params: t.Object({
        fileId: t.String({ format: "uuid" }),
      }),
    }
  );
