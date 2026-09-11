import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Relation } from "typeorm";
import { OrganizationMember } from "../../organizations/entities/organization-member.entity.js";
import { Task } from "../../tasks/entities/task.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => OrganizationMember,
        organizationMember => organizationMember.user,
    )
    memberships: Relation<OrganizationMember[]>;

    @OneToMany(
        () => Task,
        (task) => task.assignee
    )
    tasks: Relation<Task[]>;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}


