import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./user";
import { Class } from "./class";

@Entity("Enroll")
export class Enroll extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column({ type: "int", unsigned: true, nullable: false })
  classId!: number;

  @ManyToOne(() => Class)
  @JoinColumn({ name: "classId" })
  class?: Class;

  @Column({ type: "int", unsigned: true, nullable: false })
  studentId!: number;

  @ManyToOne(() => User, (student) => student.enrolls)
  @JoinColumn({ name: "studentId" })
  student?: User;
}
