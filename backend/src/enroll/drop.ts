import { t } from "elysia";
import { Enroll } from "../models/enroll";
import { AuthType } from "../types/type";

export const drop = (app: AuthType) =>
  app.delete(
    "/:id",
    async ({ profile, set, params: { id } }) => {
      const enroll = await Enroll.findOneBy({
        studentId: Number(profile.id),
        classId: Number(id),
      });

      if (!enroll) {
        set.status = 404;
        return "Not Enrolled";
      }

      try {
        await enroll.remove();

        return {
          data: {
            enroll: { id: enroll.id },
          },
        };
      } catch (err) {
        set.status = 500;
        return "Internal Server Error";
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
