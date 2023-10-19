import { Elysia, t } from "elysia";
import { Section } from "../models/section";

export const orderSection = (app: Elysia) =>
  app.put(
    "/:id/section/order",
    async ({ profile, set, body, params: { id } }) => {
      // update section order into db for each section

      const sections = body.section;
      try {
        sections.forEach(async (row) => {
          await Section.createQueryBuilder("section")
            .update(Section)
            .set({ order: row.order })
            .where("id = :id", { id: row.id })
            .execute();
        });
      } catch (err) {
        set.status = 500;
        return "Query Failed";
      }

      return {
        data: {
          class: {
            id: Number(id),
          },
        },
      }
    },
    {
      body: t.Object({
        section: t.Array(
          t.Object({
            id: t.Numeric(),
            order: t.Numeric(),
          })
        ),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
