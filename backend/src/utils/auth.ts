import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";

export const auth = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
      })
    )
    .use(bearer())
    .derive(async ({ request: { headers }, jwt, bearer, set }) => {
      if (!bearer) {
        set.status = 401;
      }

      const profile = await jwt.verify(bearer);
      if (!profile) {
        set.status = 401;
      }

      return {
        profile: profile,
      };
    });
