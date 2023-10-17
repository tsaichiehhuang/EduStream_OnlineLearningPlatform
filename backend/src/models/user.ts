import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { UserRole } from "../types/type";
import { Enroll } from "./enroll";

@Entity("User")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password!: string;

  @Column("enum", { enum: ["instructor", "student"], nullable: false })
  role!: UserRole;

  @OneToMany(() => Enroll, (enroll) => enroll.student)
  enrolls?: Enroll[];
}
