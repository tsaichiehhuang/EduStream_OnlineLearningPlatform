import { Block } from "../models/block";
import { BlockType } from "../types/type";

// CRUD blocks
export const createBlock = async (
  type: BlockType,
  id: number,
  sectionIdValue: number,
  orderValue: number
) => {
  try {
    const result = await Block.createQueryBuilder("block")
      .insert()
      .into(Block)
      .values({
        type: type,
        fileId: type === BlockType.File ? String(id) : (null as any as string),
        hwId: type === BlockType.Homework ? id : (null as any as number),
        announceId:
          type === BlockType.Announcement ? id : (null as any as number),
        sectionId: sectionIdValue,
        order: orderValue,
      })
      .execute();

    return {
      id: result.raw.insertId,
      type: type,
    };
  } catch (err) {
    throw err;
  }
};

export const removeBlock = async (id: number) => {
  try {
    await Block.createQueryBuilder("block")
      .delete()
      .from(Block)
      .where("id = :id", { id: id })
      .execute();

    return {
      id: id,
    };
  } catch (err) {
    throw err;
  }
};
