import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";
import { Stream } from "../models/stream";

export const createLive = (app: Elysia) =>
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
      "/",
      async ({ profile, body, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const access_token = process.env.API_TOKEN;
        const result = await (async function () {
          try {
            return (
              await axios.post(
                `cms/v1/lives`,
                {
                  live: {
                    name: body.name,
                    type: "LIVE_TYPE_LIVE",
                    broadcast_mode: "BROADCAST_MODE_TRADITIONAL_LIVE",
                    metadata: {
                      long_description: "",
                      short_description: "",
                    },
                    security: {
                      privacy: {
                        type: "SECURITY_PRIVACY_TYPE_PUBLIC",
                      },
                      watermark: {
                        enabled: false,
                        type: "WATERMARK_TYPE_IMAGE",
                        position: "WATERMARK_POSITION_BOTTOM_RIGHT",
                      },
                      domain_control: {
                        enabled: false,
                        domains: ["https://showroom.one-stage.kkstream.io"],
                      },
                      geo_control: [],
                    },
                    resolution: "LIVE_RESOLUTION_HD",
                    interaction: {
                      poll_enabled: false,
                      chatroom: {
                        live: {
                          enabled: true,
                          theme: "CHATROOM_THEME_LIGHT",
                        },
                        vod: {
                          enabled: false,
                        },
                      },
                    },
                    cover_images: {
                      ready_to_start: {
                        type: "COVER_IMAGE_TYPE_AUTO",
                      },
                      preview: {
                        type: "COVER_IMAGE_TYPE_AUTO",
                      },
                      end: {
                        type: "COVER_IMAGE_TYPE_AUTO",
                      },
                      close: {
                        type: "COVER_IMAGE_TYPE_AUTO",
                      },
                    },
                    save_for_download_enabled: true,
                    player: {
                      player_setting_id: "",
                    },
                  },
                },
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

        if (result.live.id) {
          const newStream = new Stream();
          newStream.name = body.name;
          newStream.startTime = new Date();
          newStream.classId = body.classID;

          try {
            await newStream.save();
            set.status = 200;
            return {
              data: {
                live: {
                  id: result.live.id,
                },
              },
            };
          } catch (err) {
            set.status = 500;
            return {
              api: "Create Live",
              error: "Save live to database failed.",
            };
          }
        } else {
          set.status = result.error.response.status;
          return {
            api: "Create Live",
            error: result.error.response.data,
          };
        }
      },
      {
        body: t.Object({
          name: t.String(),
          classID: t.Number(),
        }),
      }
    );
