import { Elysia, t } from "elysia";
import { getUserById, signIn } from "../user/user_controller";

export const userRoute = new Elysia().group("user", (app) =>
  app
    .get("/id/:id", ({ params: { id } }) => getUserById(id), {
      params: t.Object({
        id: t.Integer({ minimum: 0 }),
      }),
    })
    .post("/signin", () => signIn())
);
