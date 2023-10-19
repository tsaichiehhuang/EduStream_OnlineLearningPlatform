import { Elysia, t } from "elysia";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const update = (app: Elysia) =>
  app.put(
    "/:id",
    async ({ profile, set, body, params: { id } }) => {
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
        console.log(err);
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
