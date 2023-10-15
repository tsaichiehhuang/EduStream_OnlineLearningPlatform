import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { User } from "./user";
import { Section } from "./section";

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
  sections?: Section[];
}
