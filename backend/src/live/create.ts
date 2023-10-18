import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";

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
                    name: body.live.name,
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
          set.status = 200;
          return {
            data: {
              live: {
                id: result.live.id,
              },
            },
          };
        } else {
          set.status = result.error.response.status;
          return { error: result.error.response.data };
        }
      },
      {
        body: t.Object({
          live: t.Object({
            name: t.String(),
            type: t.Union([
              t.Literal("LIVE_TYPE_LIVE"),
              t.Literal("LIVE_TYPE_SIMULIVE"),
            ]),
            broadcast_mode: t.Union([
              t.Literal("BROADCAST_MODE_TRADITIONAL_LIVE"),
              t.Literal("BROADCAST_MODE_PLAYBACK"),
              t.Literal("BROADCAST_MODE_DVR"),
            ]),
            metadata: t.Object({
              long_description: t.String(),
              short_description: t.String(),
            }),
            security: t.Object({
              privacy: t.Object({
                type: t.Union([
                  t.Literal("SECURITY_PRIVACY_TYPE_PUBLIC"),
                  t.Literal("SECURITY_PRIVACY_TYPE_TOKEN"),
                ]),
                token: t.Optional(
                  t.Object({
                    device_limit: t.Integer(),
                  })
                ),
              }),
              watermark: t.Object({
                enabled: t.Boolean(),
                type: t.String(),
                position: t.String(),
              }),
              domain_control: t.Object({
                enabled: t.Boolean(),
                domains: t.Array(t.String()),
              }),
              geo_control: t.Array(t.Optional(t.Any())),
            }),
            resolution: t.Union([
              t.Literal("LIVE_RESOLUTION_HD"),
              t.Literal("LIVE_RESOLUTION_FHD"),
              t.Literal("LIVE_RESOLUTION_4K"),
            ]),
            interaction: t.Object({
              poll_enabled: t.Boolean(),
              chatroom: t.Object({
                live: t.Object({
                  enabled: t.Boolean(),
                  theme: t.Optional(
                    t.Union([
                      t.Literal("CHATROOM_THEME_LIGHT"),
                      t.Literal("CHATROOM_THEME_DARK"),
                    ])
                  ),
                }),
                vod: t.Object({
                  enabled: t.Boolean(),
                }),
              }),
            }),
            cover_images: t.Object({
              ready_to_start: t.Object({
                type: t.Union([
                  t.Literal("COVER_IMAGE_TYPE_AUTO"),
                  t.Literal("COVER_IMAGE_TYPE_CUSTOMIZE"),
                ]),
                customize: t.Optional(
                  t.Object({
                    library_id: t.String(),
                  })
                ),
              }),
              preview: t.Object({
                type: t.Union([
                  t.Literal("COVER_IMAGE_TYPE_AUTO"),
                  t.Literal("COVER_IMAGE_TYPE_CUSTOMIZE"),
                ]),
                customize: t.Optional(
                  t.Object({
                    library_id: t.String(),
                  })
                ),
              }),
              end: t.Object({
                type: t.Union([
                  t.Literal("COVER_IMAGE_TYPE_AUTO"),
                  t.Literal("COVER_IMAGE_TYPE_CUSTOMIZE"),
                ]),
                customize: t.Optional(
                  t.Object({
                    library_id: t.String(),
                  })
                ),
              }),
              close: t.Object({
                type: t.Union([
                  t.Literal("COVER_IMAGE_TYPE_AUTO"),
                  t.Literal("COVER_IMAGE_TYPE_CUSTOMIZE"),
                ]),
                customize: t.Optional(
                  t.Object({
                    library_id: t.String(),
                  })
                ),
              }),
            }),
            save_for_download_enabled: t.Boolean(),
            player: t.Object({
              player_setting_id: t.String(),
            }),
          }),
        }),
      }
    );
