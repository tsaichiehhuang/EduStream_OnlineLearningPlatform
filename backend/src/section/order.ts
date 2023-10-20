import { Elysia, t } from "elysia";
import { Section } from "../models/section";

export const orderSection = (app: Elysia) =>
  app.put(
    "/:id/section/order",
    async ({ profile, set, body, params: { id } }) => {
      // update section order into db for each section

      const sections = body.section;
      const len = sections.length;
      try {
        const sectionUpdates: Section[] = [];

        const updatePromises = sections.map(async (row) => {
          const section = await Section.findOneBy({ id: row.id });
          if (!section) {
            set.status = 404;
            throw "Section Not Found";
          }
          section.order = row.order + len;
          await section.save();

          section.order = row.order;
          sectionUpdates.push(section);
          console.log("test2", sectionUpdates);
        });
        await Promise.all(updatePromises);

        await Promise.all(
          sectionUpdates.map(async (section) => {
            await section.save();
          })
        );

        return {
          data: {
            class: {
              id: Number(id),
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
