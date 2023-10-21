import { t } from "elysia";
import { Class } from "../models/class";
import { AuthType } from "../types/type";

export const update = (app: AuthType) =>
  app.put(
    "/:id",
    async ({ profile, set, body, params: { id } }) => {
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
