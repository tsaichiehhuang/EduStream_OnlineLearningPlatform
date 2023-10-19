import { Elysia, t } from "elysia";
import { Class } from "../models/class";
import { createBlock } from "./block";
import { BlockType } from "../types/type";
import { Homework } from "../models/homework";
import { Block } from "../models/block";

// create block and homework
const createHomework = (app: Elysia) =>
  app.post(
    "/:id/homework",
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
        // create homework
        const date = new Date(body.endTime);
        const homeworkId = await create(date, body.description, body.title);

        // create block
        // const block = await createBlock(
        //   BlockType.Homework,
        //   homeworkId,
        //   Number(body.sectionId),
        //   body.order,
        // );
        const block = await Block.createQueryBuilder("block")
          .insert()
          .into(Block)
          .values({
            type: BlockType.Homework,
            hwId: homeworkId,
            sectionId: body.sectionId,
            order: body.order,
          })
          .execute();
        return {
          data: {
            class: {
              block: {
                id: block.raw.insertId,
                type: BlockType.Homework,
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
        endTime: t.String(),
        title: t.String(),
        description: t.String(),
        sectionId: t.Numeric(),
        order: t.Numeric(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// update block and homework
const updateHomework = (app: Elysia) =>
  app.put(
    "/:id",
    async ({ body, profile, set, params: { id } }) => {
      try {
        // update homework
        const date = new Date(body.endTime);
        await update(Number(id), date, body.description);

        return {
          data: {
            class: {
              homework: {
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
        endTime: t.String(),
        title: t.String(),
        description: t.String(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// delete block and homework
const deleteHomework = (app: Elysia) =>
  app.delete(
    "/:id",
    async ({ profile, set, params: { id } }) => {
      try {
        // delete homework
        await remove(id);

        return {
          data: {
            class: {
              homework: {
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

// CRUD homework
const create = async (endTime: Date, description: string, title: string) => {
  try {
    const result = await Homework.createQueryBuilder("homework")
      .insert()
      .into(Homework)
      .values({
        endTime: endTime,
        description: description,
        title: title,
      })
      .execute();

    return result.raw.insertId;
  } catch (err) {
    throw err;
  }
};

const update = async (id: number, endTime: Date, description: string) => {
  try {
    await Homework.createQueryBuilder("homework")
      .update(Homework)
      .set({
        endTime: endTime,
        description: description,
      })
      .where("id = :id", { id: id })
      .execute();

    return id;
  } catch (err) {
    throw err;
  }
};

const remove = async (id: number) => {
  try {
    await Homework.createQueryBuilder("homework")
      .delete()
      .from(Homework)
      .where("id = :id", { id: id })
      .execute();

    return id;
  } catch (err) {
    throw err;
  }
};

export const homeworkRoutes = (app: Elysia) =>
  app
    .use(createHomework)
    .group("/homework", (app) => app.use(updateHomework).use(deleteHomework));
