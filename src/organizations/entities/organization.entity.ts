import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrganizationMember } from "./organization-member.entity.js";

@Entity('organizations')
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => OrganizationMember,
        (organizationMember) => organizationMember.organization,
    )
    members: OrganizationMember[];

    @Column({ length: 100})
    name: string;

    @Column({ unique: true })
    slug: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}