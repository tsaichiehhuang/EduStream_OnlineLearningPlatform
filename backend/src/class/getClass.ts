import { Elysia, t } from "elysia";

import { Class } from "../models/class";
import { auth } from "../utils/auth";
import { ElysiaRequest } from "../types/typeConverter";
import { UserRole } from "../types/type";
import { Submission } from "../models/submission";

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
        let submittedHwIds: number[] | undefined = undefined;
        if (profile.role === UserRole.student) {
          submittedHwIds = (
            await Submission.find({
              where: result
                .sections!.map((sec) =>
                  sec
                    .blocks!.filter((blk) => blk.homework !== undefined)
                    .map((blk) => blk.homework!.id)
                )
                .flat()
                .map((hwId) => ({
                  userId: profile.id,
                  hwId: hwId,
                })),
            })
          ).map((submission) => submission.hwId);
        }
        set.status = 200;
        return {
          data: {
            class: {
              id: result.id,
              sections: result.sections!.map((sec) =>
                sec.blocks!.map((blk) => ({
                  ...blk,
                  homework: blk.homework
                    ? {
                        ...blk.homework,
                        done: submittedHwIds?.some(
                          (subHwId) => subHwId === blk.homework!.id
                        ),
                      }
                    : undefined,
                }))
              ),
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
