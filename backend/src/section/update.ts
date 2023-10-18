import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const update = (app: Elysia) =>
  app.use(auth).put(
    "/:id",
    async ({ profile, set, body, params: { id } }) => {
      if (set.status !== 200 || !profile) return "Unauthorized";

      const isClass = await Class.findOneBy({
        instructorId: Number(profile.id),
        id: Number(id),
      });
      if (!isClass) {
        set.status = 404;
        return "Class Not Found";
      }

      const title = body.title;

      try {
        await Section.createQueryBuilder("section")
          .update(Section)
          .set({
            description: title,
          })
          .where("id = :id", { id: id })
          .execute();

        return {
          data: {
            class: {
              section: {
                id: id,
              },
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
        title: t.String(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
