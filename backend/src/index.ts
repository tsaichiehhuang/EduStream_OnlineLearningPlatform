import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { initDatabase } from "./models/config";

import { signup } from "./user/signup";
import { signin } from "./user/signin";
import { info } from "./user/info";

import { getLive } from "./live/get";
import { endLive } from "./live/end";
import { startLive } from "./live/start";
import { cancelLive } from "./live/cancel";
import { createLive } from "./live/create";
import { archiveLive } from "./live/archive";
import { previewLive } from "./live/preview";

import { getClass } from "./class/get";

import { download } from "./file/download";
import { init } from "./file/upload/init";

await initDatabase();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello World!")
  .group("user", (app) => app.use(signup).use(signin).use(info))
  .group("live", (app) =>
    app
      .use(getLive)
      .use(endLive)
      .use(startLive)
      .use(cancelLive)
      .use(createLive)
      .use(archiveLive)
      .use(previewLive)
  )
  .group("/class", (app) => app.use(getClass))
  .group("/file", (app) =>
    app.use(download()).group("/upload", (app) => app.use(init()))
  )
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
