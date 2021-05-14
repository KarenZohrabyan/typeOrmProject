import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "./entities/task.pg.entity";
import { TaskRepository } from "./repository/task.repository";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository])
    ],
    exports: [TaskService],
    providers: [TaskService],
    controllers: [TaskController]
})
export class TaskModule {}