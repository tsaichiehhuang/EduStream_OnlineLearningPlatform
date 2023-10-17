import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Enroll } from "../models/enroll";
import { UserRole } from "../types/type";

export const enroll = (app: Elysia) =>
  app
.use(auth)
    .post(
      "/:id",
      async ({ profile, set, params: { id } }) => {
        if (set.status !== 200 || !profile) return "Unauthorized";

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
