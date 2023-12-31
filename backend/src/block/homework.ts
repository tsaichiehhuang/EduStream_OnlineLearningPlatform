import { Elysia, t } from "elysia";
import { Class } from "../models/class";
import { createBlock } from "./block";
import { BlockType } from "../types/type";
import { Homework } from "../models/homework";
import { submit } from "../class/homework/submission/submit";
import { AuthType } from "../types/type";

// create block and homework
const createHomework = (app: AuthType) =>
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
        const block = await createBlock(
          BlockType.Homework,
          homeworkId,
          Number(body.sectionId)
        );
        //   let order = await Block.createQueryBuilder("block")
        //   .select("MAX(block.order)", "max")
        //   .where("block.sectionId = :sectionId", { sectionId: sectionIdValue })
        //   .getRawOne();
        // if (!order) order.max = 0;

        //   const block = await Block.createQueryBuilder("block")
        //     .insert()
        //     .into(Block)
        //     .values({
        //       type: BlockType.Homework,
        //       hwId: homeworkId,
        //       sectionId: body.sectionId,
        //       order: order.max + 1,
        //     })
        //     .execute();

        return {
          data: {
            class: {
              block: {
                id: block.id,
                type: BlockType.Homework,
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
      body: t.Object({
        endTime: t.String(),
        title: t.String(),
        description: t.String(),
        sectionId: t.Numeric(),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );

// update block and homework
const updateHomework = (app: AuthType) =>
  app.put(
    "/:id",
    async ({ body, profile, set, params: { id } }) => {
      try {
        // update homework
        await update(Number(id), body.endTime, body.description, body.title);

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
const deleteHomework = (app: AuthType) =>
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

const update = async (
  id: number,
  endTime: string,
  description: string,
  title: string
) => {
  try {
    const homework = await Homework.findOneBy({ id: id });
    if (!homework) throw new Error("Homework Not Found");
    if (endTime !== "") homework.endTime = new Date(endTime);
    if (description !== "") homework.description = description;
    if (title !== "") homework.title = title;
    await homework.save();

    // await Homework.createQueryBuilder("homework")
    //   .update(Homework)
    //   .set({
    //     endTime: endTime,
    //     description: description,
    //     title: title,
    //   })
    //   .where("id = :id", { id: id })
    //   .execute();

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
    .group("/homework", (app) =>
      app.use(updateHomework).use(deleteHomework).use(submit)
    );
