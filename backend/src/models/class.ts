import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('Class')
export class Class {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'int', unsigned: true, nullable: false })
    instructorId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'instructorId' })
    instructor?: User;

    @Column({ type: 'varchar', length: 50, nullable: false })
    time!: string;
}
