import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Enroll } from "../models/enroll";

export const drop = (app: Elysia) =>
  app.use(auth).delete(
    "/:id",
    async ({ profile, set, params: { id } }) => {
      if (set.status !== 200 || !profile) return "Unauthorized";

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
