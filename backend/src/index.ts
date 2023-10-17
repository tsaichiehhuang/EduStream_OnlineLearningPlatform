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

import { download } from "./file/download";

await initDatabase();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello World!")
  .post("/hello", ({ body }) => `Hello ${body.name}`, {
    body: t.Object({
      name: t.String(),
    }),
  })
  .group("/enroll", (app) => app.use(enroll).use(drop))
  .group("/class", (app) => app.use(classlist).use(create).use(update))
  .group("user", (app) => app.use(signup).use(signin).use(info))
  .group("/file", (app) => app.use(download()))
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
