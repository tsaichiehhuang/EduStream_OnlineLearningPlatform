import process from "process";
import { t } from "elysia";
import axios, { AxiosError } from "axios";
import { AuthType } from "../types/type";

export const endLive = (app: AuthType) =>
  app.post(
    "/:liveId/end",
    async ({ params, set }) => {
      const access_token = process.env.API_TOKEN;
      const result = await (async function () {
        try {
          return (
            await axios.post(
              `cms/v1/lives/${params.liveId}:end`,
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
          api: "End Live",
          error: result.error.response.data,
        };
      } else {
        set.status = 200;
        return {
          live: {
            id: params.liveId,
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
