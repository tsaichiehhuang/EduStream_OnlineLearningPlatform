import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors';

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello World!")
  .post("/hello", ({ body }) => `Hello ${body.name}`, {
    body: t.Object({
      name: t.String(),
    })
  })
  .listen(3050);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;