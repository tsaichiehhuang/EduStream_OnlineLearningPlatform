import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { compareSync } from "bcrypt-ts";

import { User } from "../models/user";
import { IUser } from "../types/type";

export const signin = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
        exp: "7d",
      })
    )
    .post(
      "/signin",
      async ({ body, set, jwt }) => {
        const email: string = body.email;
        const password: string = body.password;

        if (!email || !password) {
          set.status = 400;
          return "Request Error: email and password are required.";
        }

        try {
          const user = await User.findOneBy({ email: email });

          if (!user) {
            set.status = 404;
            return "Error: User Not Found";
          }

          if (!compareSync(password, user.password)) {
            set.status = 403;
            return "Error: Wrong Password";
          }

          const userObj: IUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };

          set.status = 200;
          return {
            data: {
              access_token: await jwt.sign({
                id: String(userObj.id),
                name: userObj.name,
                email: userObj.email,
              }),
              user: userObj,
            },
          };
        } catch (err) {
          set.status = 500;
          return "Error: DB Query Failed Error";
        }
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
      }
    );
