import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PaginationQueryDto } from './dto/pagination-query.dto.js';
import { PaginatedResultDto } from './dto/paginated-result.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRespository: Repository<Task>,
    ){}

    async getAllTasks(paginationQueryDto: PaginationQueryDto): Promise<PaginatedResultDto<Task>> {
        const page = paginationQueryDto.page ?? 1;
        const limit = paginationQueryDto.limit ?? 10;

        const [data, total] = await this.taskRespository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'ASC'
            },
        });

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    
}
