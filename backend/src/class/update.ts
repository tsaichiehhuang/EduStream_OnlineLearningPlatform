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

      const isClass = await Class.findOneBy({
        instructorId: Number(profile.id),
        id: Number(id),
      });
      if (!isClass) {
        set.status = 404;
        return "Class Not Found";
      }

      const announcement = body.announcement;

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
