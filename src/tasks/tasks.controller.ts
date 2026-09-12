import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { Task } from './entities/task.entity.js';
import { PaginatedResultDto } from './dto/paginated-result.dto.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(
    @Query() paginationQueryDto: PaginationQueryDto
  ): Promise<PaginatedResultDto<Task>> {
    return this.tasksService.getAllTasks(paginationQueryDto);
  }


    
}
