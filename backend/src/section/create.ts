import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const create = (app: Elysia) =>
  app.use(auth).post(
    "/:id/section",
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
      const order = body.order;
      if (!title) {
        set.status = 400;
        return "Field should not be empty";
      }

      try {
        const result = await Section.createQueryBuilder("section")
          .insert()
          .into(Section)
          .values({
            description: title,
            classId: Number(id),
            order: order,
          })
          .execute();

        return {
          data: {
            class: {
              section: {
                id: result.raw.insertId,
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
        order: t.Number(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
