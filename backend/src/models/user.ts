import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment", { type: 'int', unsigned: true })
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    email!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password!: string;

    @Column('enum', { enum: ['instructor', 'student'], nullable: false })
    role!: 'instructor' | 'student';
}
