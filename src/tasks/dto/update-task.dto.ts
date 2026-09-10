import { IsString, IsNotEmpty, IsOptional, IsISO8601, IsInt, IsEnum, MaxLength } from "class-validator";
import { TaskPriority } from "../enums/task-priority.enum.js";

export class UpdateTaskDto {
    @IsString()
        @MaxLength(200)
        @IsOptional()
        name?: string;
    
        @IsString()
        @IsOptional()
        description?: string;
    
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