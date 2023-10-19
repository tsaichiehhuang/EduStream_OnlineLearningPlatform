import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { initDatabase } from "./models/config";

import { signup } from "./user/signup";
import { signin } from "./user/signin";
import { info } from "./user/info";

import { enroll } from "./enroll/enroll";
import { drop } from "./enroll/drop";
import { classlist } from "./class/classlist";
import { create } from "./class/create";
import { update } from "./class/update";
import { getClass } from "./class/getClass";
import { getHomework } from "./class/getHomework";

import { getLive } from "./live/get";
import { endLive } from "./live/end";
import { startLive } from "./live/start";
import { socketChat } from "./live/socket"
import { cancelLive } from "./live/cancel";
import { createLive } from "./live/create";
import { archiveLive } from "./live/archive";
import { previewLive } from "./live/preview";

import { download } from "./file/download";
import { init } from "./file/upload/init";

await initDatabase();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello World!")
  .group("/enroll", (app) => app.use(enroll).use(drop))
  .group("/class", (app) => app.use(classlist).use(create).use(update).use(getClass).use(getHomework))
  .group("user", (app) => app.use(signup).use(signin).use(info))
  .group("live", (app) =>
    app
      .use(getLive)
      .use(endLive)
      .use(startLive)
      .use(cancelLive)
      .use(createLive)
      .use(socketChat)
      .use(archiveLive)
      .use(previewLive)
  )
  .group("/file", (app) =>
    app.use(download()).group("/upload", (app) => app.use(init()))
  )
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
