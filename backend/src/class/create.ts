import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Class } from "../models/class";
import { Section } from "../models/section";
import { UserRole } from "../types/type";

export const create = (app: Elysia) =>
  app.use(auth).post(
    "/",
    async ({ profile, set, body }) => {
      if (set.status !== 200) return "Unauthorized";
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      if (profile.role !== UserRole.instructor) {
        set.status = 403;
        return "Forbidden to Create a Class";
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

      await Section.createQueryBuilder("section")
        .insert()
        .into(Section)
        .values({
          description: "Default Section",
          classId: newClass.raw.insertId,
          order: 0,
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
