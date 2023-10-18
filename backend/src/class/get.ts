import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";
import { Class } from "../models/class";

export const getClass = (app: Elysia) =>
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
        profile: profile,
      };
    })
    .get(
      "/:classId",
      async ({ profile, params, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const result = await Class.createQueryBuilder("class")
          .leftJoinAndSelect("class.sections", "sections")
          .leftJoinAndSelect("sections.blocks", "blocks")
          .where("class.id = :classId", { classId: params.classId })
          .getOne();

        if (!result) {
          set.status = 404;
          return { error: "No resources were found with given class ID." };
        } else {
          set.status = 200;
          return {
            data: {
              class: {
                id: result.id,
                sections: result.sections,
              },
            },
          };
        }
      },
      {
        params: t.Object({
          classId: t.String(),
        }),
      }
    );
