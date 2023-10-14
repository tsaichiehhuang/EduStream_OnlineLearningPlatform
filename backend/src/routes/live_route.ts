import { Elysia, t } from "elysia";
import { createLive } from "../live/live_controller";

export const liveRoute = new Elysia().group("live", (app) =>
  app.use(createLive())
);
