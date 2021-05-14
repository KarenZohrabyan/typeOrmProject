import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../entities/task.pg.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    public async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { name } = createTaskDto;
        const IfTaskExists = await this.findOne({name});

        if(IfTaskExists) {
            throw new ConflictException(`Username with "${name}" already exists`);
        }

        const task = this.create(createTaskDto);
        await task.save();
        return task;
    }
}