import { randomUUID as uuid } from "crypto";
import fs from "fs/promises";
import path from "path";

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import axios from "axios";

import { KK_API_ENDPOINT } from "../util/constant";

@Entity("File")
export class File extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // see this when using this hook: https://github.com/typeorm/typeorm/issues/5493
  @BeforeInsert()
  generateId() {
    if (this.id === undefined) {
      this.id = uuid();
    }
  }

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  // no path if file saved in kkCompany
  @Column({ type: "varchar", length: 255, nullable: true })
  path?: string;

  @Column("enum", { enum: ["kkCompany", "local"], nullable: false })
  location!: "kkCompany" | "local";

  @Column({ type: "datetime", nullable: false, default: "CURRENT_TIMESTAMP" })
  uploadTime!: Date;

  public async remove() {
    if (this.location === "kkCompany") {
      await axios.delete(`cms/v1/library/files/${this.id}`, {
        baseURL: KK_API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
          "x-bv-org-id": process.env.X_BV_ORG_ID,
        },
      });
    } else if (typeof this.path === "string") {
      const staticRoot = path.resolve("static");
      await fs.rm(path.resolve(staticRoot, this.path), { force: true });
    }
    return super.remove();
  }
}
