// get user info api
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { JWTPayloadSpec, jwt } from "@elysiajs/jwt";
import { IToken, IUser, UserRole } from "../types/type";
import { User } from "../models/user";

export const info = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
      })
    )
    .use(bearer())
    .derive(async ({ jwt, bearer }) => {
      const profile = await jwt.verify(bearer);

      return {
        profile: profile as false | (IToken & JWTPayloadSpec),
      };
    })
    .get(
      "/info/:id",
      async ({ profile, set, params: { id } }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        if (Number(profile.id) !== Number(id)) {
          set.status = 403;
          return "Permission Denied";
        }

        const user = await User.findOneBy({ id: Number(id) });

        if (!user) {
          set.status = 404;
          return "User Not Found";
        }

        const userObj: IUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
        };

        return {
          data: {
            user: userObj,
          },
        };
      },
      {
        async beforeHandle({ bearer, set }) {
          if (!bearer) {
            set.status = 401;
            set.headers[
              "WWW-Authenticate"
            ] = `Bearer realm='sign', error="invalid_request"`;

            return "Error: Unauthorized";
          }
        },
        params: t.Object({
          id: t.String(),
        }),
      }
    );
