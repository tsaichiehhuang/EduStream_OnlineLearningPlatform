import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";

export const getLive = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
      })
    )
    .use(bearer())
    .derive(async ({ jwt, bearer }) => {
      const profile = await jwt.verify(bearer);

      return {
        profile: profile,
      };
    })
    .get(
      "/:liveId",
      async ({ profile, params, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const access_token = process.env.API_TOKEN;
        const result = await (async function () {
          try {
            return (
              await axios.get(`cms/v1/lives/${params.liveId}`, {
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
            return { error: err };
          }
        })();

        if (result.error) {
          set.status = result.error.response.status;
          return {
            api: "Get Live",
            error: result.error.response.data,
          };
        } else {
          set.status = 200;
          const link =
            result.live.setup == null
              ? null
              : result.live.setup.rtmp.links[0].url;
          const key =
            result.live.setup == null
              ? null
              : result.live.setup.rtmp.links[0].stream_key;
          const url = result.live.stream[0] == null
            ? null
            : result.live.stream[0].manifests[0].uris[0].uri;

          return {
            data: {
              live: {
                id: result.live.id,
                name: result.live.name,
                created_at: result.live.created_at,
                updated_at: result.live.updated_at,
                status: result.live.status,
                setup: {
                  links: link,
                  key: key,
                },
                url: url,
              },
            },
          };
        }
      },
      {
        params: t.Object({
          liveId: t.String({
            format: "uuid",
            default: "00000000-0000-0000-0000-000000000000",
          }),
        }),
      }
    );
