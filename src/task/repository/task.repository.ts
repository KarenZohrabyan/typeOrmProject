import { BadRequestException, ConflictException } from "@nestjs/common";
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
        const task = this.create(createTaskDto);
        task.user = user;
        await task.save();
        return task;
    }

    public async getUserTasks(user: UserEntity): Promise<TaskEntity[]> {
        if(!user) {
            throw new BadRequestException('There is no user: 400 error!!!');
        }

        const query = this.createQueryBuilder('tasks')
            .leftJoin('tasks.user', 'user')
            .select([
                'tasks.name', 'tasks.id',
                'user.name', 'user.email'
            ])
            .where('user.id = :userId', {userId: user.id})
        
        const result = await query.getMany();
        return result;
    }
}