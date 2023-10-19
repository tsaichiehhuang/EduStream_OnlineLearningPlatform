import { Elysia } from "elysia";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const deleteSection = (app: Elysia) =>
  app.delete("/:id", async ({ profile, set, params: { id } }) => {
    try {
      await Section.createQueryBuilder("section")
        .delete()
        .from(Section)
        .where("id = :id", { id: id })
        .execute();
    } catch (err) {
      set.status = 500;
      console.log(err);
      return "Query Failed";
    }

    return {
      data: {
        class: {
          section: {
            id: id,
          },
        },
      },
    };
  });
