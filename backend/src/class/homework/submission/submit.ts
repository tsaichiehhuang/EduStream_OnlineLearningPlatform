import { t } from "elysia";
import axios, { AxiosError } from "axios";
import { KKFileUploadComplete } from "../../../types/type";
import { KK_API_ENDPOINT } from "../../../utils/constant";
import { Homework } from "../../../models/homework";
import { User } from "../../../models/user";
import { File } from "../../../models/file";
import { Submission } from "../../../models/submission";
import { AuthType } from "../../../types/type";

export const submit = (app: AuthType) =>
  app.post(
    "/:id/submit",
    async function ({ params: { id: hwId }, body, set, profile }) {
      const homework = await Homework.find({
        relations: {},
        where: { id: hwId },
      });
      if (homework === null) {
        set.status = 400;
        return "No such homework";
      }
      if (
        (await User.findOne({
          relations: {
            enrolls: {
              class: {
                sections: {
                  blocks: true,
                },
              },
            },
          },
          where: {
            id: profile.id,
            enrolls: {
              class: {
                sections: {
                  blocks: {
                    hwId: hwId,
                  },
                },
              },
            },
          },
        })) === null
      ) {
        set.status = 403;
        return "Haven't received this homework";
      }

      if (
        body.uploadId !== undefined &&
        body.checksum_sha1 !== undefined &&
        body.parts !== undefined
      ) {
        // kk file
        try {
          await axios.post(
            `cms/v1/library/files/${body.id}:complete-upload`,
            {
              complete_data: {
                id: body.id,
                checksum_sha1: body.checksum_sha1,
                parts: body.parts,
              },
            },
            {
              baseURL: KK_API_ENDPOINT,
              headers: {
                Authorization: `Bearer ${process.env.API_TOKEN}`,
                "x-bv-org-id": process.env.X_BV_ORG_ID,
              },
            }
          );
        } catch (err) {
          if (err instanceof AxiosError) {
            if (err.response?.status === 400 || err.response?.status === 404) {
              set.status = err.response?.status;
              return err.response?.data?.message;
            }
            if (
              err.response?.status === 500 &&
              typeof err.response.data?.message === "string" &&
              (err.response.data?.message as string).includes(
                "file already completed"
              )
            ) {
              set.status = 400;
              return "file already completed";
            }
            if (
              err.response?.status === 500 &&
              typeof err.response.data?.message === "string" &&
              (err.response.data?.message as string).includes(
                "https response error StatusCode: 400"
              )
            ) {
              set.status = 400;
              return "invalid args to remote";
            }
            if (
              err.response?.status === 500 &&
              typeof err.response.data?.message === "string" &&
              (err.response?.data?.message as string).includes(
                "https response error StatusCode: 404"
              )
            ) {
              set.status = 404;
              return "file not found on remote";
            }
            console.error("unexpected error from KK when submitting homework");
            console.error(
              `\tstudent ${profile.id} is trying to submit to homework ${hwId} with file ${body.id}`
            );
            console.error("\tresponse:", err.response);
            throw err;
          } else {
            console.error("unexpected error occurred when submitting homework");
            console.error(
              `\tstudent ${profile.id} is trying to submit to homework ${hwId} with file ${body.id}`
            );
            console.error("\tdetails:", err);
            throw err;
          }
        }
        await File.create({
          id: body.id,
          location: "kkCompany",
          name: body.id,
        }).save();
      } else {
        // local file
        let file = await File.findOneBy({ id: body.id, location: "local" });
        if (file === null) {
          set.status = 404;
          return "Local file not found";
        }
        if (file.path === null || file.path === undefined) {
          set.status = 400;
          return "Local file not completely uploaded";
        }
      }
      await Submission.create({
        hwId: hwId,
        fileId: body.id,
        userId: profile.id,
      }).save();
      return {};
    },
    {
      params: t.Object({
        id: t.Numeric({ minimum: 1, multipleOf: 1, default: 0 }),
      }),
      body: KKFileUploadComplete,
    }
  );
