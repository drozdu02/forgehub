import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Task } from '../tasks/entities/task.entity.js';
import { User } from '../user/entities/user.entity.js';

@Injectable()
export class ProjectsService {
    constructor(
    ){}

    
}
