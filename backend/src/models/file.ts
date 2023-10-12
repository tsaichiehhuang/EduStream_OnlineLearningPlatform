import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { randomUUID as uuid } from "crypto";

@Entity("File")
export class File {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  path!: string;

  @Column("enum", { enum: ["kkCompany", "local"], nullable: false })
  location!: "kkCompany" | "local";
}
