import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { randomUUID as uuid } from "crypto";

@Entity("File")
export class File extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // see this when using this hook: https://github.com/typeorm/typeorm/issues/5493
  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  path?: string;

  @Column("enum", { enum: ["kkCompany", "local"], nullable: false })
  location!: "kkCompany" | "local";

  @Column({ type: "datetime", nullable: false, default: "CURRENT_TIMESTAMP" })
  uploadTime!: Date;
}
