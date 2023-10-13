import { Elysia } from "elysia";

import { signup } from "../user/signup";
import { signin } from "../user/signin";

export const userRoute = new Elysia().group(
  "user",
  (app) => app.use(signup).use(signin)
  // .post("/signin", ({ body, set }) => signIn(body.name, body.password, set), {
  //   body: t.Object({
  //     name: t.String(),
  //     password: t.String(),
  //   }),
  // })
  // .get("/id/:id", ({ params: { id } }) => getUserById(id)),
  // {
  //   params: t.Object({
  //     id: t.Integer({ minimum: 0 }),
  //   }),
  // }
);
