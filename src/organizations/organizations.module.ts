import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller.js';
import { OrganizationsService } from './organizations.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization])
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
