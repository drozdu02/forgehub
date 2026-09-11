import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { ProjectsController } from './projects.controller.js';
import { Project } from './entities/project.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
        TypeOrmModule.forFeature([Project])
      ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
