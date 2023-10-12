import { env } from "process";
import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./user";
import { Class } from "./class";
import { Enroll } from "./enroll";
import { File } from "./file";
import { Homework } from "./homework";
import { Submission } from "./submission";
import { Stream } from "./stream";
import { Announcement } from "./announcement";
import { Block } from "./block";
import { Week } from "./week";

if (env.MODE === "test") {
  console.info("DB running in test mode");
}

export const Database = new DataSource({
  type: "mysql",
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  host: env.DB_HOST,
  database: env.MODE === "test" ? "EduStream_test" : "EduStream",
  entities: [User, Class, Enroll, File, Homework, Submission, Stream, Announcement, Block, Week],
  acquireTimeout: 3000,
  connectTimeout: 3000,
  debug: env.MODE === "test",
})

export async function initDatabase() {
  while (1) {
    try {
      await Database.initialize();
      break;
    } catch (err) {
      console.warn("Can't connect to database. Try again in 3 seconds.");
      console.info(err, "\n");
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}