import fs from "node:fs/promises";
import { randomUUID as uuid } from "crypto";
import path from "path";

import { Elysia, t } from "elysia";
import { File } from "../../models/file";
import { staticRoot } from "../../util/constant";

export const binary = (app: Elysia) =>
  app.put(
    "/binary",
    async ({ body, set }) => {
      const dbFile = await File.findOneBy({ id: body.id, location: "local" });
      if (dbFile === null) {
        set.status = 404;
        return "File not found";
      }
      console.log("uploading file size:", body.file.size);
      console.log("\tfile type:", body.file.type);

      if (!fs.exists(staticRoot) || (await fs.stat(staticRoot)).isFile()) {
        console.warn("\tstatic file's root is invalid. Creating.");
        await fs.rm(staticRoot, { force: true, recursive: true });
        await fs.mkdir(staticRoot);
      }
      if (typeof dbFile.path === "string") {
        console.log("\tremoving old file with save file id at", dbFile.path);
        await fs.rm(path.resolve(staticRoot, dbFile.path), { force: true });
      }

      let filePath = path.resolve(staticRoot, dbFile.name);
      if (
        path.dirname(filePath) != staticRoot ||
        (!dbFile.path && (await fs.exists(filePath)))
      ) {
        filePath = path.resolve("static/", uuid());
      }
      console.log("\twriting file to", filePath);
      await Bun.write(filePath, body.file);
      dbFile.path = path.basename(filePath);
      await dbFile.save();
    },
    {
      body: t.Object({
        id: t.String({
          format: "uuid",
          default: "00000000-0000-0000-0000-000000000000",
        }),
        file: t.File(),
      }),
    }
  );
