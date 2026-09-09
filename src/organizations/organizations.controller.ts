import { Body, Controller, ParseIntPipe, Post, Query } from '@nestjs/common';
import { OrganizationsService } from './organizations.service.js';
import { CreateOrganizationDto } from './dto/create-organization.dto.js';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post(':userId')
  async createOrganization(
    @Query('userId', ParseIntPipe) userId: number,
    @Body() createOrganizationDto: CreateOrganizationDto
  ) {
    return this.organizationsService.createOrganization(userId, createOrganizationDto);
  }
}
