import process from "process";
import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";

export const getLive = () =>
  new Elysia().get(
    "/:liveId",
    async ({ params, set }) => {
      // TODO: wait for Anna completing login system
      const access_token = process.env.API_TOKEN;
      const result = await (async function () {
        try {
          return (
            await axios.get(
              `cms/v1/lives/${params.liveId}`,
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
          if (err instanceof AxiosError) {
            set.status = err.response?.status;
            if (set.status !== 404) {
              console.warn(
                `failed to get live. :\n\treason:${err.response}`
              );
              return `Unknown error when get live. Status ${err.response?.status}`;
            } else {
              return "";
            }
          } else {
            set.status = "Internal Server Error";
            return "";
          }
        }
      })();

      set.status = 200;
      return {
        data: {
          live:{
            id: result.id,
            name: result.name,
            created_at: result.created_at,
            updated_at: result.updated_at,
            status: result.status,
            setup: {
                links: result.setup.rtmp.links[0].url,
                key: result.setup.rtmp.links[0].stream_key
            },
            url: result.stream[0].manifests[0].uris[0].uri
          }
        },
      };
    },
    {
      params: t.Object({
        liveId: t.String({
            format: "uuid",
            default: "00000000-0000-0000-0000-000000000000",
        })
      })
    }
  );
