import { Elysia, t } from "elysia";

import { Class } from "../models/class";
import { auth } from "../utils/auth";
import { ElysiaRequest } from "../types/typeConverter";

export const getClass = (
  app: Elysia<
    "",
    {
      request: {
        profile: Exclude<
          ElysiaRequest<typeof auth>["profile"],
          null | undefined
        >;
      };
      store: {};
    }
  >
) =>
  app.get(
    "/:classId",
    async ({ profile, params, set }) => {
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      const result = await Class.createQueryBuilder("class")
        .leftJoinAndSelect("class.sections", "sections")
        .leftJoinAndSelect("sections.blocks", "blocks")
        .leftJoinAndSelect("blocks.file", "file")
        .leftJoinAndSelect("blocks.announcement", "announcement")
        .leftJoinAndSelect("blocks.homework", "homework")
        .where("class.id = :classId", { classId: params.classId })
        .getOne();


      if (!result) {
        set.status = 404;
        return { error: "No resources were found with given class ID." };
      } else {
        set.status = 200;
        return {
          data: {
            class: {
              id: result.id,
              sections: result.sections,
            },
          },
        };
      }
    },
    {
      params: t.Object({
        classId: t.String(),
      }),
    }
  );
