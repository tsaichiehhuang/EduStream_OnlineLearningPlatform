import process from "process";
import { Elysia, t } from "elysia";
import { bearer } from "@elysiajs/bearer";
import { jwt } from "@elysiajs/jwt";
import axios, { AxiosError } from "axios";
import { Submission } from "../models/submission";

export const getHomework = (app: Elysia) =>
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
      "/:classId/:homeworkId",
      async ({ profile, params, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }

        const result = await Submission.find({
          select: ['id','userId','fileId','content','score'],
          where:{
            hwId: Number(params.homeworkId)
          }
        })


        if (!result) {
          set.status = 404;
          return { error: "No resources were found with given homework ID." };
        } else {
          set.status = 200;
          return {
            data: {
              class: {
                homework: {
                  id: params.homeworkId,
                  submission: result
                }
              },
            },
          };
        }
      },
      {
        params: t.Object({
          homeworkId: t.String(),
          classId: t.String()
        }),
      }
    );
