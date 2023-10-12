import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Homework')
export class Homework {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column('datetime', { nullable: false })
    endTime!: Date;

    @Column({ type: 'text', nullable: false })
    description!: string;
}