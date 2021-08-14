import { BadRequestException, ConflictException } from "@nestjs/common";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { Role } from "src/utility/enums/role.enum";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../entities/task.pg.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    public async createTask(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
        const userTasks: TaskEntity[] = await this.createQueryBuilder('tasks')
            .leftJoin('tasks.user', 'user')
            .select([
                'tasks.name'
            ])
            .where('user.id = :userId', { userId: user.id })
            .getMany();

        const ifTaskExists: TaskEntity[] = userTasks.filter((item) => item.name === createTaskDto.name);
        if(ifTaskExists.length !== 0) {
            throw new ConflictException(`Task with "${createTaskDto.name}" already exists`);
        }
        const task: TaskEntity = this.create(createTaskDto);
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
                'tasks.name', 'tasks.id', 'tasks.state', 'tasks.orders'
            ])
            .where('user.id = :userId', {userId: user.id})

        const result: TaskEntity[] = await query.getMany();
        return result;
    }

    public async getSelectedTasks(user: UserEntity): Promise<TaskEntity[]> {
        if(!user) {
            throw new BadRequestException('There is no user: 400 error!!!');
        }

        // return await this.createQueryBuilder('tasks')
        //     .leftJoin('tasks.user', 'user')
        //     .select([
        //         'tasks.name', 'tasks.id', 'tasks.state'
        //     ])
        //     .where('user.id = :userId', {userId: user.id})
        //     .andWhere('tasks.state = :publish', {publish: 'publish'})
        //     .orWhere('tasks.state = :unpublish', { unpublish: "unpublish"})
        //     .orderBy('tasks.id', 'ASC')
        //     .getMany();

        return await this.createQueryBuilder('tasks')
            .leftJoin('tasks.user', 'user')
            .where('user.id = :userId', {userId: user.id})
            .select("SUM(tasks.id)", "Sum of id's")
            .getRawMany()

        // return await this.createQueryBuilder('tasks')
        //     .leftJoin('tasks.user', 'user')
        //     .where('user.id = :userId', {userId: user.id})
        //     .select(['user.id AS id'])
        //     .addSelect(['AVG(tasks.orders) AS total_usage'])
        //     .getRawMany()

        // return await this.find({select: ["orders"]});
    }
}