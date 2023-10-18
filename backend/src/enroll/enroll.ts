import { Elysia, t } from "elysia";
import { Enroll } from "../models/enroll";

export const enroll = (app: Elysia) =>
  app.post(
    "/:id",
    async ({ profile, set, params: { id } }) => {
      const enroll = await Enroll.findOneBy({
        studentId: Number(profile.id),
        classId: Number(id),
      });

      if (enroll) {
        set.status = 409;
        return "Already Enrolled";
      }

      const newEnroll = new Enroll();
      newEnroll.classId = Number(id);
      newEnroll.studentId = Number(profile.id);

      try {
        await newEnroll.save();

        return {
          data: {
            enroll: { id: newEnroll.id },
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
