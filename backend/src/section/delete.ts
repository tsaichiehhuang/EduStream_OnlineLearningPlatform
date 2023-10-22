import { Section } from "../models/section";
import { AuthType } from "../types/type";

export const deleteSection = (app: AuthType) =>
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
