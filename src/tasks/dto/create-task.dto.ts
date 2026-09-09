import { IsEnum, IsInt, IsISO8601, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskPriority } from "../enums/task-priority.enum.js";

export class CreateTaskDto {
    @IsString()
    @MaxLength(200)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsEnum(TaskPriority)
    taskPriority?: TaskPriority;

    @IsOptional()
    @IsISO8601()
    deadline?: string;

    @IsOptional()
    @IsInt()
    assigneeId?: number;


}