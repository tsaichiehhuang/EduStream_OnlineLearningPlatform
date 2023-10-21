// path.resolve(staticRoot, dbFile.path)
// file/download.ts

// const dbFile = await File.findOneBy({ id: fileId });
// import { KK_API_ENDPOINT, staticRoot } from "../utils/constant";

import { Elysia, t } from "elysia";
import { File } from "../models/file";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { KK_API_ENDPOINT, staticRoot } from "../utils/constant";
import path from "path";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";

export const createSummary = (app: Elysia) =>
  app.post(
    "/:fileId",
    async ({ profile, params, set }) => {
      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      try {
        const dbFile = await File.findOneBy({ id: params.fileId });
        if (dbFile === null || dbFile.path === undefined) {
          set.status = 404;
          return "File not found";
        }
        const loader = new PDFLoader(path.resolve(staticRoot, dbFile.path));
        const docs = await loader.load();

        const concat_doc = docs.map((doc) => doc.pageContent).join("");
        const concat_doc_len =
          Math.floor(concat_doc.length * 0.2) > 0
            ? Math.floor(concat_doc.length * 0.2)
            : 1;

        const splitter = new CharacterTextSplitter({
          separator: "\n",
          chunkSize: concat_doc_len,
          chunkOverlap:
            Math.floor(concat_doc_len / 5) == 0
              ? 1
              : Math.floor(concat_doc_len / 5),
        });
        const output = await splitter.createDocuments([concat_doc]);
        console.warn(
          output,
          concat_doc_len,
          Math.floor(concat_doc_len / 5),
          output.length
        );

        const chain = loadSummarizationChain(new OpenAI({ temperature: 0 }), {
          type: "map_reduce",
        });
        const answer = await chain.call({
          input_documents: docs,
        });
        console.warn({ answer });

        set.status = 200;
        return {
          message: answer,
        };
      } catch (err) {
        console.warn(err);
        set.status = 500;
        return {
          api: "Create Summary",
          error: "Create summary failed.",
        };
      }
    },
    {}
  );
