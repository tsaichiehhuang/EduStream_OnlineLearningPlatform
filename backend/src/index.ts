import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";

import { initDatabase } from "./models/config";

import { download } from "./file/download";
import { userRoute } from "./routes/user_route";

await initDatabase();

const app = new Elysia()
  .use(cors())
  .use(userRoute)
  .get("/", () => "Hello World!")
  .group("/file", (app) => app.use(download()))
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
