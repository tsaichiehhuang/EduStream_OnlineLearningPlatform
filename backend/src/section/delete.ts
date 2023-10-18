import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Section } from "../models/section";
import { Class } from "../models/class";

export const deleteSection = (app: Elysia) =>
  app.use(auth).delete("/:id", async ({ profile, set, params: { id } }) => {
    if (set.status !== 200) return "Unauthorized";
    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }

    const isClass = await Class.findOneBy({
      instructorId: Number(profile.id),
      id: Number(id),
    });
    if (!isClass) {
      set.status = 404;
      return "Class Not Found";
    }

    try {
      await Section.createQueryBuilder("section")
        .delete()
        .from(Section)
        .where("id = :id", { id: id })
        .execute();
    } catch (err) {
      set.status = 500;
      console.log(err);
      return "Query Failed";
    }

    return {
      data: {
        class: {
          section: {
            id: id,
          },
        },
      },
    };
  });
