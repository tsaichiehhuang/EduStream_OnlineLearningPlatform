import { env } from "process";
import { Elysia, t } from "elysia";
import { JWTPayloadSpec, jwt } from "@elysiajs/jwt";
import { bearer } from "@elysiajs/bearer";
import axios from "axios";
import z, { ZodError } from "zod";

import { File } from "../../models/file";
import { User } from "../../models/user";
import { IToken } from "../../types/type";
import { KK_API_ENDPOINT } from "../../util/constant";

// skipped unused fields
const kkSuccessBody = z.object({
  file: z.object({
    id: z.string().uuid(),
  }),
  upload_data: z.object({
    id: z.string(),
    parts: z.array(
      z.object({
        part_number: z.number().gt(0).int(),
        presigned_url: z.string().url(),
      })
    ),
  }),
});

async function kkUpload(name: string, size: number) {
  const kkFileTypes = [
    "FILE_TYPE_VIDEO",
    "FILE_TYPE_IMAGE",
    "FILE_TYPE_DOCUMENT",
  ];

  for (const ft of kkFileTypes) {
    try {
      const result = kkSuccessBody.parse(
        (
          await axios.post(
            "cms/v1/library/files:upload",
            {
              file: {
                type: ft,
                name: name,
                size: size,
              },
            },
            {
              baseURL: KK_API_ENDPOINT,
              headers: {
                Authorization: `Bearer ${env.API_TOKEN}`,
                "x-bv-org-id": env.X_BV_ORG_ID,
              },
            }
          )
        ).data
      );
      console.log(`initialize file upload to KK:`, {
        fileName: name,
        fileSize: size,
        fileId: result.file.id,
        partId: result.upload_data.id,
      });
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(
          `wrong schema return by KK when initializing upload.\n${error.issues}`
        );
        throw error;
      }
    }
  }
  throw new Error("not accepted by KKStream");
}

async function localUpload(name: string) {
  const file = File.create({
    name: name,
    location: "local",
  });
  await file.save();
  console.log(`initialize file upload to local:`, {
    fileName: name,
    fileId: file.id,
  });
  return {
    name: name,
    id: file.id,
    location: "local",
  };
}

export const init = (config: ConstructorParameters<typeof Elysia>[0] = {}) =>
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
    .post(
      "/init",
      async ({ body, set, profile }) => {
        if (!profile) {
          set.status = 401;
          return "Unauthorized";
        }
        if ((await User.findOneBy({ id: Number(profile.id) })) === null) {
          set.status = 403;
          return "Permission Denied";
        }

        try {
          const kkFileMeta = await kkUpload(body.name, body.size);
          return {
            name: body.name,
            id: kkFileMeta.file.id,
            location: "kkCompany",
            uploadId: kkFileMeta.upload_data.id,
            parts: kkFileMeta.upload_data.parts,
          };
        } catch (err) {
          if (err instanceof ZodError) {
            throw err;
          } else if (
            err instanceof Error &&
            err.message !== "not accepted by KKStream"
          ) {
            throw err;
          } else {
            return await localUpload(body.name);
          }
        }
      },
      {
        body: t.Object({
          name: t.RegExp(/^\S+$/gu, { default: "file.name" }),
          size: t.Numeric({ minimum: 0 }),
        }),
      }
    );
