import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Announcement')
export class Announcement {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column('datetime', { nullable: false })
    date!: Date;

    @Column({ type: 'text', nullable: false })
    content!: string;
}