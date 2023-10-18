import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Section } from "../models/section";

export const defaultclass = (app: Elysia) =>
  app.use(auth).get("/default/:id", async ({ profile, set, params: { id } }) => {
    if (set.status !== 200) return "Unauthorized";
    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    try {
      // find the section by class id, and order = 0
      const result = await Section.createQueryBuilder("section")
        .select("section.id", "id")
        .leftJoinAndSelect("section.block", "block")
        .leftJoinAndSelect("block.file", "file")
        .leftJoinAndSelect("block.homework", "homework")
        .leftJoinAndSelect("block.announce", "announce")
        .where("classId = :id AND `order` = :order", { id: id, order: 0 })
        .getRawOne();

      return {
        data: {
          class: {
            id: result.id,
          },
        },
      };
    } catch (err) {
      set.status = 500;
      return "Query Failed";
    }

  }, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });
