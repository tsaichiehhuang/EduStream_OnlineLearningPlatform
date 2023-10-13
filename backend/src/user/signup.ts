import { Elysia, t } from "elysia";
import { hashSync } from "bcrypt-ts";
const SALT = process.env.BCRYPT_SALT ? parseInt(process.env.BCRYPT_SALT) : 10;
import { jwt } from "@elysiajs/jwt";
import validator from "validator";

// import * as User from "../models/user_model";
import { User } from "../models/user";
import { UserRole, IUser } from "../types/type";

export const signup = (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : "",
        exp: "7d",
      })
    )
    .post(
      "/signup",
      async ({ body, set, jwt }) => {
        let name: string = body.name;
        const email: string = body.email;
        const password: string = body.password;

        if (!name || !email || !password) {
          set.status = 400;
          return "Request Error: name, email and password are required.";
        }

        if (name == "" || email == "" || password == "") {
          set.status = 400;
          return "Request Error: name, email and password cannot be empty.";
        }

        if (!validator.isEmail(email)) {
          set.status = 400;
          return "Request Error: Invalid email format.";
        }

        name = validator.escape(name);

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = hashSync(password, SALT);
        newUser.role = UserRole.student;

        // TODO: alter email check unique method
        try {
          const isregisted = await User.findOneBy({ email: newUser.email });
          if (isregisted) {
            set.status = 403;
            return "Error: Email Already Exists";
          }
        } catch (err) {
          set.status = 500;
          return "Error: DB Query Failed Error";
        }

        try {
          await newUser.save();

          const userObj: IUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          };

          return {
            data: {
              access_token: jwt.sign({
                id: String(userObj.id),
                name: userObj.name,
                email: userObj.email,
              }),
              user: userObj,
            },
          };
        } catch (err) {
          set.status = 403;
          return "Error: Email Already Exists";
        }
      },
      {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String(),
        }),
      }
    );
