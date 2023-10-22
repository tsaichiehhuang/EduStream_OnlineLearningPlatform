import { t } from "elysia";
import { Section } from "../models/section";
import { Class } from "../models/class";
import { AuthType } from "../types/type";

export const create = (app: AuthType) =>
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
      if (!title) {
        set.status = 400;
        return "Field should not be empty";
      }

      try {
        const order = await Section.createQueryBuilder("section")
          .select("MAX(section.order)", "max")
          .where("section.classId = :classId", { classId: id })
          .getRawOne();

        const result = await Section.createQueryBuilder("section")
          .insert()
          .into(Section)
          .values({
            description: title,
            classId: Number(id),
            order: order.max + 1,
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
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
