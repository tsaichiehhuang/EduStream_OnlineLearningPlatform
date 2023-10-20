import { Elysia, t } from "elysia";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const create = (app: Elysia) =>
  app.post(
    "/:id/section",
    async ({ profile, set, body, params: { id } }) => {
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
