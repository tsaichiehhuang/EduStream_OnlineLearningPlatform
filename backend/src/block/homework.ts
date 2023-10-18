import { Homework } from "../models/homework";

// create block and homework

// CRUD homework
const create = async (endTime: Date, description: string) => {
  try {
    const result = await Homework.createQueryBuilder("homework")
      .insert()
      .into(Homework)
      .values({
        endTime: endTime,
        description: description,
      })
      .execute();

    return {
      data: {
        class: {
          homework: {
            id: result.raw.insertId,
          },
        },
      },
    };
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
    throw err;
  }
};
