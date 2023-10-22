import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Submission } from "./submission";
@Entity("Homework")
export class Homework extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column("datetime", { nullable: false })
  endTime!: Date;

  @Column({ type: "text", nullable: false })
  description!: string;

  @Column({ type: "text", nullable: true })
  title!: string;

  @OneToMany(() => Submission, (submission) => submission.homework)
  submission?: import("./submission").Submission;
}
