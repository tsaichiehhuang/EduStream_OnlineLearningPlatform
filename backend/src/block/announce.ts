import { Elysia, t } from "elysia";
import { Announcement } from "../models/announcement";
import { Class } from "../models/class";
import { createBlock } from "./block";
import { BlockType } from "../types/type";

// create block and announce
const createAnnounce = (app: Elysia) =>
  app.post(
    "/:id/announce",
    async ({ body, profile, set, params: { id } }) => {
      const isClass = await Class.findOneBy({
        instructorId: Number(profile.id),
        id: Number(id),
      });
      if (!isClass) {
        set.status = 404;
        return "Class Not Found";
      }

      try {
        // create announce
        const announceId = await create(body.content);

        // create block
        const block = await createBlock(
          BlockType.Announcement,
          announceId,
          Number(body.sectionId),
        );

        return {
          data: {
            class: {
              block: {
                id: block.id,
                type: block.type,
              },
            },
          },
        };
      } catch (err) {
        set.status = 500;
        console.log(err);
        return "Query Failed";
      }
    },
    {
      body: t.Object({
        // title: t.String(),
        content: t.String(),
        sectionId: t.Numeric(),
        // order: t.Numeric(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// update block and announce
const updateAnnounce = (app: Elysia) =>
  app.put(
    "/:id",
    async ({ body, profile, set, params: { id } }) => {
      // TODO: validate instructor
      try {
        // update announce
        await update(id, body.content);

        return {
          data: {
            class: {
              announce: {
                id: id,
              },
            },
          },
        };
      } catch (err) {
        set.status = 500;
        console.log(err);
        return "Query Failed";
      }
    },
    {
      body: t.Object({
        content: t.String(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// delete block and announce
const deleteAnnounce = (app: Elysia) =>
  app.delete(
    "/:id",
    async ({ profile, set, params: { id } }) => {
      // TODO: validate instructor

      try {
        // delete announce
        await remove(id);

        return {
          data: {
            class: {
              announce: {
                id: id,
              },
            },
          },
        };
      } catch (err) {
        set.status = 500;
        return "Query Failed";
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// CRUD announcement
const create = async (content: string) => {
  try {
    const result = await Announcement.createQueryBuilder("announcement")
      .insert()
      .into(Announcement)
      .values({
        content: content,
      })
      .execute();

    return result.raw.insertId;
  } catch (err) {
    throw err;
  }
};

const update = async (id: number, content: string) => {
  try {
    await Announcement.createQueryBuilder("announcement")
      .update(Announcement)
      .set({
        content: content,
      })
      .where("id = :id", { id: id })
      .execute();

    return {
      data: {
        class: {
          announce: {
            id: id,
          },
        },
      },
    };
  } catch (err) {
    throw err;
  }
};

const remove = async (id: number) => {
  try {
    await Announcement.createQueryBuilder("announcement")
      .delete()
      .from(Announcement)
      .where("id = :id", { id: id })
      .execute();

    return {
      data: {
        class: {
          announce: {
            id: id,
          },
        },
      },
    };
  } catch (err) {
    throw err;
  }
};

export const announceRoutes = (app: Elysia) =>
  app
    .use(createAnnounce)
    .group("/announce", (app) => app.use(updateAnnounce).use(deleteAnnounce));
