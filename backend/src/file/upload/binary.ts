import { env } from "process";
import fs from "node:fs/promises";
import { randomUUID as uuid } from "crypto";
import path from "path";

import { Elysia, t } from "elysia";
import { JWTPayloadSpec, jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";

import { User } from "../../models/user";
import { File } from "../../models/file";
import { IToken } from "../../types/type";

export const binary = (config: ConstructorParameters<typeof Elysia>[0] = {}) =>
  new Elysia(config)
    .use(
      jwt({
        name: "jwt",
        secret: env.JWT_SECRET!,
      })
    )
    .use(bearer())
    .derive(async ({ jwt, bearer }) => ({
      profile: (await jwt.verify(bearer)) as false | (IToken & JWTPayloadSpec),
    }))
    .put(
      "/binary",
      async ({ body, profile, set }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }
        if ((await User.findOneBy({ id: Number(profile.id) })) === null) {
          set.status = 403;
          return "Permission Denied";
        }
        const dbFile = await File.findOneBy({ id: body.id, location: "local" });
        if (dbFile === null) {
          set.status = 404;
          return "File not found";
        }
        console.log("uploading file size:", body.file.size);
        console.log("\tfile type:", body.file.type);

        const staticRoot = path.resolve("static");
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
        if (path.dirname(filePath) != staticRoot || ( !dbFile.path && await fs.exists(filePath))) {
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
