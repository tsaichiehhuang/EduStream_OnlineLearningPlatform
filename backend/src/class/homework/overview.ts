// for instructor to overview homework {id} 's all submissions' status
import { Elysia, t } from "elysia";
import { User } from "../../models/user";
import { AuthType } from "../../types/type";

// Endpoint: /class/homework/:id/overview
export const overview = (app: AuthType) =>
  app.get(
    "/:id/overview",
    async ({ profile, set, params: { id } }) => {
      if (profile.role !== "instructor") {
        set.status = 403;
        return "Not an Instructor";
      }

      const result = await User.find({
        relations: {
          enrolls: {
            class: {
              sections: {
                blocks: {
                  homework: true,
                },
              },
            },
          },
          submissions: true,
        },
        where: {
          enrolls: {
            class: {
              sections: { blocks: { homework: { id: id } } },
            },
          },
        },
      });

      if (!result) {
        set.status = 404;
        return "No homework found";
      }

      const homeworkOverview = {
        id: id,
        submissions: result.map((user: User) => ({
          user: user.name,
          status: user!.enrolls![0].class!.sections![0].blocks![0].homework!
            .submission
            ? true
            : false,
          fileId: user!.submissions![0]?.fileId
            ? user!.submissions![0]?.fileId
            : null,
          score: user!.submissions![0]?.score
            ? user!.submissions![0]?.score
            : null,
        })),
      };

      return {
        data: {
          homework: homeworkOverview,
        },
      };
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
