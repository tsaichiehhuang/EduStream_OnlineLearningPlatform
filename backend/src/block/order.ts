import { Elysia, t } from "elysia";
import { Block } from "../models/block";

export const orderBlock = (app: Elysia) =>
  app.put(
    "/:id/block/order",
    async ({ profile, set, body, params: { id } }) => {
      // update block order into db for each block

      const blocks = body.block;
      try {
        blocks.forEach(async (row) => {
          await Block.createQueryBuilder("block")
            .update(Block)
            .set({ order: row.order })
            .where("id = :id", { id: row.id })
            .execute();
        });
      } catch (err) {
        set.status = 500;
        return "Query Failed";
      }

      return {
        data: {
          section: {
            id: Number(id),
          },
        },
      };
    },
    {
      body: t.Object({
        block: t.Array(
          t.Object({
            id: t.Numeric(),
            order: t.Numeric(),
          })
        ),
      }),
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
