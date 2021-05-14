import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./entities/task.pg.entity";
import { TaskRepository } from "./repository/task.repository";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository
    ) {}

    public async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskRepository.createTask(createTaskDto);
    }
}