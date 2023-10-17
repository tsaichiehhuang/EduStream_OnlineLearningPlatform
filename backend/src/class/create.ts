import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Class } from "../models/class";

export const create = (app: Elysia) =>
  app.use(auth).post(
    "/",
    async ({ profile, set, body }) => {
      if (set.status !== 200) return "Unauthorized";
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      const name = body.name;
      const time = body.time;
      const announcement = body.announcement;

      if (!name || !time || !announcement) {
        set.status = 400;
        return "Field should not be empty";
      }

      const newClass = await Class.createQueryBuilder("class")
        .insert()
        .into(Class)
        .values({
          name: name,
          time: time,
          announcement: announcement,
          instructorId: Number(profile.id),
        })
        .execute();

      return {
        data: {
          class: {
            id: newClass.raw.insertId,
          },
        },
      };
    },
    {
      body: t.Object({
        name: t.String(),
        time: t.String(),
        announcement: t.String(),
      }),
    }
  );
