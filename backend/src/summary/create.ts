import { Elysia, t } from "elysia";
import { File } from "../models/file";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { staticRoot } from "../utils/constant";
import path from "path";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

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
          Math.floor(concat_doc.length * 0.2) > 1
            ? Math.floor(concat_doc.length * 0.2)
            : 2;

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

        const vectorStore = await MemoryVectorStore.fromDocuments(
          output,
          new OpenAIEmbeddings()
        );

        const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
        const chain = RetrievalQAChain.fromLLM(
          model,
          vectorStore.asRetriever()
        );

        const response = await chain.call({
          query: "這份文件的摘要是什麼？",
        });
        set.status = 200;
        return {
          message: response,
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
