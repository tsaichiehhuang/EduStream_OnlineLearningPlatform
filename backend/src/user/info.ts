import { Elysia, t } from "elysia";
// import { bearer } from "@elysiajs/bearer";
// import { jwt } from "@elysiajs/jwt";
import { IUser, UserRole } from "../types/type";
import { User } from "../models/user";

export const info = (app: Elysia) =>
  app
    // .use(
    //   jwt({
    //     name: "jwt",
    //     secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
    //   })
    // )
    // .use(bearer())
    // .derive(async ({ jwt, bearer }) => {
    //   const profile = await jwt.verify(bearer);

    //   return {
    //     profile: profile,
    //   };
    // })
    .get(
      "/info/:id",
      async ({ profile, set, params: { id } }) => {
        // if (!profile) {
        //   set.status = 401;
        //   return "Unauthorized";
        // }
        if (set.status !== 200 || !profile) return "Unauthorized";

        if (Number(profile.id) !== id) {
          set.status = 403;
          return "Permission Denied";
        }

        const user = await User.findOneBy({ id: id });
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
        // async beforeHandle({ set }) {
        //   if (!bearer) {
        //     set.status = 401;
        //     set.headers[
        //       "WWW-Authenticate"
        //     ] = `Bearer realm='sign', error="invalid_request"`;

        //     return "Error: Unauthorized";
        //   }
        // },
        params: t.Object({
          id: t.Numeric(),
        }),
      }
    );
