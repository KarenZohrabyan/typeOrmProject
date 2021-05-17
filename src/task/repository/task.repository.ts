import { ConflictException } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../entities/task.pg.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    public async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        const { name } = createTaskDto;
        const IfTaskExists = await this.findOne({name});
        

        if(IfTaskExists) {
            throw new ConflictException(`Username with "${name}" already exists`);
        }
        // const task = this.create(createTaskDto);
        console.log(user.name)
        const task = new TaskEntity();
        task.name = createTaskDto.name;
        task.user = user;
        await task.save();
        return task;
    }
}