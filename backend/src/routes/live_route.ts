import { Elysia, t } from "elysia";
import { createLive } from "../live/create";
import { cancelLive } from "../live/cancel";
import { getLive } from "../live/get";
import { endLive } from "../live/end";
import { startLive } from "../live/start";
import { previewLive } from "../live/preview";
import { archiveLive } from "../live/archieve";

export const liveRoute = new Elysia().group("live", (app) => app
  .use(getLive())
  .use(endLive())
  .use(startLive())
  .use(createLive())
  .use(cancelLive())
  .use(previewLive())
  .use(archiveLive())
);
