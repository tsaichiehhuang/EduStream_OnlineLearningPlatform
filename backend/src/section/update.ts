import { t } from "elysia";
import { Section } from "../models/section";
import { AuthType } from "../types/type";

export const update = (app: AuthType) =>
  app.put(
    "/:id",
    async ({ set, body, params: { id } }) => {
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
