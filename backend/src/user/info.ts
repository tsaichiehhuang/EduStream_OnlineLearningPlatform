// get user info api
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import { IUser, UserRole } from "../types/type";


export const info = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
      })
    )
    .use(bearer())
    .get(
      "/info/:id",
      async ({ jwt, bearer, set, params: { id }, cookie: { auth } }) => {
        // check the info in bearer
        if (!bearer) {
          set.status = 401;
          return "Error: Unauthorized";
        }
        const profile = await jwt.verify(bearer);
        console.log(profile);
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const userObj: IUser = {
          id: Number(profile.id),
          name: profile.name,
          email: profile.email,
          role: profile.role as UserRole,
        };

        return {
          data: {
            user: userObj,
          },
        };
      },
      {
        params: t.Object({
          id: t.String(),
        }),
      }
    );
