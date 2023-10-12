import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Class } from './class';

@Entity('Week')
export class Week {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true, nullable: false })
    classId!: number;

    @ManyToOne(() => Class)
    @JoinColumn({ name: 'classId' })
    class?: Class;

    @Column({ type: 'text', nullable: false })
    description!: string;

    @Column({ type: 'smallint', unsigned: true, nullable: false })
    week!: number;
}