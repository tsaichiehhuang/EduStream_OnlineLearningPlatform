import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";
import { Stream } from "../models/stream";

export const archiveLive = (app: Elysia) =>
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
    .post(
      "/:liveId/archive",
      async ({ profile, body, params, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const access_token = process.env.API_TOKEN;
        const result = await (async function () {
          try {
            return (
              await axios.post(
                `cms/v1/lives/${params.liveId}:archive`,
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
            api: "Archive Live",
            error: result.error.response.data,
          };
        } else {
          const stream = await Stream.findOneBy({
            classId: Number(body.classID),
          });

          if (!stream) {
            set.status = 404;
            return {
              api: "Archive Live",
              error: "No live were found with given class ID",
            };
          }

          try {
            await stream.remove();
            set.status = 200;
            return {
              live: {
                id: params.liveId,
              },
            };
          } catch (err) {
            set.status = 500;
            return {
              api: "Archive Live",
              error: "Delete live from database failed.",
            };
          }
        }
      },
      {
        params: t.Object({
          liveId: t.String({
            format: "uuid",
            default: "00000000-0000-0000-0000-000000000000",
          }),
        }),
        body: t.Object({
          classID: t.Number(),
        }),
      }
    );
