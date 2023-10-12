import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user';
import { File } from './file';
import { Homework } from './homework';

@Entity('Submission')
export class Submission extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'int', unsigned: true, nullable: false })
    hwId!: number;

    @ManyToOne(() => Homework)
    @JoinColumn({ name: 'hwId' })
    homework?: Homework;

    @Column({ type: 'int', unsigned: true, nullable: false })
    userId!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user?: User;

    @Column({ type: 'char', length: 36, nullable: true })
    fileId?: string;

    @ManyToOne(() => File)
    @JoinColumn({ name: 'fileId' })
    file?: File;

    @Column({ type: 'text', nullable: true })
    content?: string;

    @Column({ type: 'float', precision: 24, scale: 4, nullable: true })
    score?: number;
}