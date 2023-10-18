import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { File } from "./file";
import { Homework } from "./homework";
import { Announcement } from "./announcement";
import { Section } from "./section";
import { BlockType } from "../types/type";

@Entity("Block")
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column("enum", {
    enum: ["homework", "announcement", "file"],
    nullable: false,
  })
  type!: BlockType.File | BlockType.Announcement | BlockType.Homework;

  @Column({ type: "int", unsigned: true, nullable: false })
  sectionId!: number;

  @ManyToOne(() => Section, (section) => section.blocks)
  @JoinColumn({ name: "weekId" })
  section?: import("./section").Section;

  @Column({ type: "char", length: 36, nullable: true })
  fileId?: string;

  @OneToOne(() => File)
  @JoinColumn({ name: "fileId" })
  file?: File;

  @Column({ type: "int", unsigned: true, nullable: true })
  hwId?: number;

  @OneToOne(() => Homework)
  @JoinColumn({ name: "hwId" })
  homework?: Homework;

  @Column({ type: "int", unsigned: true, nullable: true })
  announceId?: number;

  @OneToOne(() => Announcement)
  @JoinColumn({ name: "announceId" })
  announcement?: Announcement;
}
