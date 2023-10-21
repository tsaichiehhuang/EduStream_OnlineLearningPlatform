// path.resolve(staticRoot, dbFile.path)
// file/download.ts

// const dbFile = await File.findOneBy({ id: fileId });
// import { KK_API_ENDPOINT, staticRoot } from "../utils/constant";

// import { Elysia, t } from "elysia";
// import { File } from "../models/file"
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
// import { KK_API_ENDPOINT, staticRoot } from "../utils/constant";
// import path from "path";

// export const createSummary = (app: Elysia) =>
//   app.post(
//     "/:fileId",
//     async ({ profile, params, set }) => {

//         if (!profile) {
//           set.status = 401;
//           return "Unauthorized";
//         }

//         try {

//             const dbFile = await File.findOneBy({ id: params.fileId });
//             if (dbFile === null || dbFile.path === undefined) {
//                 set.status = 404;
//                 return "File not found";
//             }
//             const loader = new PDFLoader(path.resolve(staticRoot, dbFile.path));
//             const docs = await loader.load();
//             console.warn(docs,dbFile.path)

//             set.status = 200
//             return {
//                 message: "A temp success"
//             }

//         } catch (err) {
//             set.status = 500;
//             return {
//                 api: "Create Summary",
//                 error: "Create summary failed.",
//             };
//         }

//     },
//     {}
//   );
