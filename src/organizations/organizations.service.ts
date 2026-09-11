import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Organization } from './entities/organization.entity.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';
import { User } from '../user/entities/user.entity.js';
import { OrganizationMember } from './entities/organization-member.entity.js';
import { OrganizationRole } from './enums/organization-role.enum.js';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
        @InjectDataSource()
        private readonly dataSource: DataSource
    ){}

    async createOrganization(
        userId: number,
        createOrganizationDto: CreateOrganizationDto
    ): Promise<Organization>{
        return this.dataSource.transaction(
            async (manager) => {
                const user = await manager.findOne(User, {
                    where: {id: userId}
                });

                if (!user) {
                    throw new NotFoundException(`User with id ${userId} not found`);
                }

                const organization = manager.create(Organization, {
                    name: createOrganizationDto.name,
                    slug: createOrganizationDto.slug
                });
                
                const savedOrganization = await manager.save(organization);

                const memberShip = manager.create(OrganizationMember, {
                    user: user,
                    organization: savedOrganization,
                    role: OrganizationRole.OWNER
                });
                await manager.save(memberShip);
                return savedOrganization;
            },
        );
    }
}
