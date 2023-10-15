import process from "process";
import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";

export const previewLive = () =>
  new Elysia().post(
    "/:liveId:preview",
    async ({ params, set }) => {
      // TODO: wait for Anna completing login system
      const access_token = process.env.API_TOKEN;
      await (async function () {
        try {
          return (
            await axios.post(
              `cms/v1/lives/${params.liveId}:preview`,
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
          if (err instanceof AxiosError) {
            set.status = err.response?.status;
            if (set.status !== 404) {
              console.warn(
                `failed to preview live. :\n\treason:${err.response}`
              );
              return `Unknown error when preview live. Status ${err.response?.status}`;
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
        live: {
            id: params.liveId
        }
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