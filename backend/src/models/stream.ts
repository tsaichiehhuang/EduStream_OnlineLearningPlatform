import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity } from 'typeorm';
import { Class } from './class';

@Entity('Stream')
export class Stream extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column('datetime', { nullable: false })
    startTime!: Date;

    @Column({ type: 'int', unsigned: true, nullable: false })
    classId!: number;

    @OneToOne(() => Class)
    @JoinColumn({ name: 'classId' })
    class?: Class;
}
