import { Elysia, t } from "elysia";
import { getUserById, signIn } from "../user/user_controller";

export const userRoute = new Elysia().group("user", (app) =>
  app
    .get("/id/:id", ({ params: { id } }) => getUserById(id))
    .post("/signin", () => signIn())
);
