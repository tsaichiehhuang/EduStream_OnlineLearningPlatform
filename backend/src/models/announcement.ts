import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('Announcement')
export class Announcement extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column('datetime', { nullable: false })
    date!: Date;

    @Column({ type: 'text', nullable: false })
    content!: string;
}