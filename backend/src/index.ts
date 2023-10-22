import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { initDatabase } from "./models/config";

import { auth } from "./utils/auth";

import { signup } from "./user/signup";
import { signin } from "./user/signin";
import { info } from "./user/info";

import { enroll } from "./enroll/enroll";
import { drop } from "./enroll/drop";
import { classlist } from "./class/classlist";
import { create } from "./class/create";
import { update } from "./class/update";
import { getClass } from "./class/getClass";

import { defaultclass } from "./class/defaultclass";
import { create as createSection } from "./section/create";
import { update as updateSection } from "./section/update";
import { orderSection } from "./section/order";
import { deleteSection } from "./section/delete";

import { announceRoutes } from "./block/announce";
import { homeworkRoutes } from "./block/homework";
import { createFile, removeFile } from "./block/file";
import { orderBlock } from "./block/order";

import { overview as homeworkOverview } from "./class/homework/overview";
import { deleteHomework } from "./class/homework/delete";

import { socket } from "./socket/socket";

import { getLive } from "./live/get";
import { endLive } from "./live/end";
import { startLive } from "./live/start";
import { cancelLive } from "./live/cancel";
import { createLive } from "./live/create";
import { archiveLive } from "./live/archive";
import { previewLive } from "./live/preview";

import { download } from "./file/download";
import { init } from "./file/upload/init";
import { binary } from "./file/upload/binary";
import { cancel } from "./file/upload/cancel";
import { createSummary } from "./summary/create";

await initDatabase();

const app = new Elysia()
  .use(socket)
  .use(cors())
  .get("/", () => "Hello World!")
  .group("user", (app) => app.use(signup).use(signin).use(info))
  .use(auth)
  .group("/enroll", (app) => app.use(enroll).use(drop))
  .group("/class", (app) =>
    app
      .use(classlist)
      .use(create)
      .use(update)
      .use(getClass)
      .use(defaultclass)
      .use(createSection)
      .use(orderSection)
      .group("/section", (app) =>
        app.use(updateSection).use(deleteSection).use(orderBlock)
      )
      .group("/homework", (app) =>
        app.use(homeworkOverview).use(deleteHomework)
      )
      .use(announceRoutes)
      .use(homeworkRoutes)
      .use(createFile)
      .use(removeFile)
  )
  .group("/summary", (app) => app.use(createSummary))
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
  .group("/file", (app) =>
    app
      .use(download)
      .group("/upload", (app) => app.use(init).use(binary).use(cancel))
  )
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
