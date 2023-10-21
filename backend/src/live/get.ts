import process from "process";
import { t } from "elysia";
import axios, { AxiosError } from "axios";
import { AuthType } from "../types/type";

export const getLive = (app: AuthType) =>
  app.get(
    "/:liveId",
    async ({ profile, params, set }) => {

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
