import process from "process";
import { t } from "elysia";
import axios, { AxiosError } from "axios";
import { Stream } from "../models/stream";
import { AuthType } from "../types/type";

export const createLive = (app: AuthType) =>
  app.post(
    "/",
    async ({ profile, body, set }) => {

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
                  ull_enabled: true,
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

      if (result.live) {
        const newStream = new Stream();
        newStream.id = result.live.id;
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
