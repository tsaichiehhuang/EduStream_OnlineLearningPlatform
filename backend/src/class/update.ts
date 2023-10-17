// update class announcement
import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Class } from "../models/class";

export const update = (app: Elysia) =>
  app.use(auth).put(
    "/:id",
    async ({ profile, set, body, params: { id } }) => {
      if (set.status !== 200) return "Unauthorized";
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      const announcement = body.announcement;

      if (!announcement) {
        set.status = 400;
        return "Field should not be empty";
      }

      try {
        await Class.createQueryBuilder("class")
          .update(Class)
          .set({
            announcement: announcement,
          })
          .where("id = :id", { id: id })
          .execute();

        return {
          data: {
            class: {
              id: id,
            },
          },
        };
      } catch (err) {
        set.status = 500;
        return "Query Failed";
      }
    },
    {
      body: t.Object({
        announcement: t.String(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
