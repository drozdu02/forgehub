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
        const {page, limit} = paginationQueryDto;

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

    async getTask(id: number): Promise<Task> {
        const task = await this.taskRespository.findOneBy({
            id: id
        });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    async getTasksByProjectId(
        projectId: number,
        paginationQueryDto: PaginationQueryDto
    ): Promise<PaginatedResultDto<Task>> {
        const {page, limit} = paginationQueryDto;

        const [data, total] = await this.taskRespository.findAndCount({
            where: {
                project: { id: projectId}
            },
            skip: (page - 1) * limit,
            take: limit,
            order: {
                createdAt: 'ASC'
            },
        });

        if (data.length === 0) {
            throw new NotFoundException(`No tasks found for project with id ${projectId}`);
        }

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


    async createTask(
        createTaskDto: CreateTaskDto
    ): Promise<Task> {
        const task = this.taskRespository.create({
            name: createTaskDto.name,
            description: createTaskDto.description,
            taskPriority: createTaskDto.taskPriority,
            deadline: createTaskDto.deadline,
            assignee: createTaskDto.assigneeId ? { id: createTaskDto.assigneeId } : null
        });
        return await this.taskRespository.save(task);
    }

    async deleteTask(id: number): Promise<void> {
        const existingTask = await this.taskRespository.findOneBy({
            id: id
        });
        if (!existingTask) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        await this.taskRespository.delete(id);
    }

    async updateTask(
        id: number,
        updateTaskDto: UpdateTaskDto

    ): Promise<Task> {
        const task = await this.taskRespository.preload({
            id: id,
            ...updateTaskDto,
            assignee: updateTaskDto.assigneeId ? { id: updateTaskDto.assigneeId } : null,
            deadline: updateTaskDto.deadline ? new Date(updateTaskDto.deadline) : null
        });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return await this.taskRespository.save(task);
    }
}
