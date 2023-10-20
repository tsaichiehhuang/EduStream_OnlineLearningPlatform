import { Elysia, t } from "elysia";
import { Class } from "../models/class";
import { BlockType } from "../types/type";

export const defaultclass = (app: Elysia) =>
  app.get(
    "/default/:id",
    async ({ profile, set, params: { id } }) => {
      try {
        // find the section by class id, and order = 0
        const result = await Class.createQueryBuilder("class")
          .leftJoinAndSelect("class.sections", "sections")
          .leftJoinAndSelect("sections.blocks", "blocks")
          .leftJoinAndSelect("blocks.file", "file")
          .leftJoinAndSelect("blocks.homework", "homework")
          .leftJoinAndSelect("blocks.announcement", "announcement")
          .where("sections.classId = :id AND sections.order = :order", {
            id: id,
            order: 0,
          })
          .getOne();

        if (!result) {
          set.status = 404;
          return { error: "No resources were found with given class ID." };
        }

        return {
          data: {
            class: result,
          },
        };
      } catch (err) {
        set.status = 500;
        return "Query Failed";
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
