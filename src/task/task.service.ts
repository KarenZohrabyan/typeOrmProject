import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./entities/task.pg.entity";
import { TaskRepository } from "./repository/task.repository";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository
    ) {}

    public async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    public async getUserTasks(user: UserEntity): Promise<TaskEntity[]> {
        return this.taskRepository.getUserTasks(user);
    }

    public async getSelectedTasks(user: UserEntity): Promise<TaskEntity[]> {
        return this.taskRepository.getSelectedTasks(user);
    }

    public async getPaginatedTasks(user: UserEntity) {
        return this.taskRepository.getPaginatedTasks(user);
    }
}