import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Class } from "./class";
import { Block } from "./block";
import exp from "constants";

@Entity("Section")
export class Section extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column({ type: "int", unsigned: true, nullable: false })
  classId!: number;

  @ManyToOne(() => Class, (cls) => cls.sections)
  @JoinColumn({ name: "classId" })
  class?: import("./class").Class;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "int", unsigned: true, nullable: false })
  order!: number;

  @OneToMany(() => Block, (block) => block.section)
  blocks?: import("./block").Block[];
}
