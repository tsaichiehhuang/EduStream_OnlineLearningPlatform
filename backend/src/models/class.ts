import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";
import { User } from "./user";
import { Section } from "./section";
import { Stream } from "./stream";

@Entity("Class")
export class Class extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "int", unsigned: true, nullable: false })
  instructorId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "instructorId" })
  instructor?: import("./user").User;

  @Column({ type: "varchar", length: 50, nullable: false })
  time!: string;

  @Column({ type: "text", nullable: false })
  announcement!: string;

  @OneToMany(() => Section, (section) => section.class)
  sections?: import("./section").Section[];

  @OneToOne(() => Stream, (stream) => stream.class)
  stream?: import("./stream").Stream;
}
