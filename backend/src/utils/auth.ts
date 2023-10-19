import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { JWTPayloadSpec, jwt } from "@elysiajs/jwt";

import { User } from "../models/user";
import { IToken } from "../types/type";

export const auth = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET!,
      })
    )
    .use(bearer())
    .derive(async ({ jwt, bearer }) => {
      const profile = (await jwt.verify(bearer)) as
        | false
        | (IToken & JWTPayloadSpec);

      return {
        profile:
          profile === false
            ? undefined
            : await User.findOneBy({ id: Number(profile.id) }),
      };
    })
    .onBeforeHandle(({ set, profile }) => {
      if (profile === undefined) {
        set.status = 401;
        return "Unauthorized";
      }
      if (profile === null) {
        set.status = 403;
        return "Permission Denied";
      }
    });
