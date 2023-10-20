import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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
}
