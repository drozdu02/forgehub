import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    name: string;

    @Column({ unique: true })
    slug: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}