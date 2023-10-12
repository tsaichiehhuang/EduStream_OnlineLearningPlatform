import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { File } from './file';
import { Homework } from './homework';
import { Announcement } from './announcement';
import { Week } from './week';

@Entity('Block')
export class Block {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column('enum', { enum: ['homework', 'announcement', 'file'], nullable: false })
    type!: 'homework' | 'announcement' | 'file';

    @Column({ type: 'int', unsigned: true, nullable: false })
    weekId!: number;

    @ManyToOne(() => Week)
    @JoinColumn({ name: 'weekId' })
    week?: Week;

    @Column({ type: 'char', length: 36, nullable: true })
    fileId?: string;

    @ManyToOne(() => File)
    @JoinColumn({ name: 'fileId' })
    file?: File;

    @Column({ type: 'int', unsigned: true, nullable: true })
    hwId?: number;

    @ManyToOne(() => Homework)
    @JoinColumn({ name: 'hwId' })
    homework?: Homework;

    @Column({ type: 'int', unsigned: true, nullable: true })
    announceId?: number;

    @ManyToOne(() => Announcement)
    @JoinColumn({ name: 'announceId' })
    announcement?: Announcement;
}