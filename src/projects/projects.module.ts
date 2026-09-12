import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { ProjectsController } from './projects.controller.js';
import { Project } from './entities/project.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsService } from '../organizations/organizations.service.js';
import { Organization } from '../organizations/entities/organization.entity.js';
@Module({
  imports: [
      TypeOrmModule.forFeature([Project, Organization]),
    ],
  controllers: [ProjectsController],
  providers: [ProjectsService, OrganizationsService],
})
export class ProjectsModule {}
