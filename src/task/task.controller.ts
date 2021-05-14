import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskEntity } from "./entities/task.pg.entity";
import { TaskService } from "./task.service";

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
    constructor(
        private readonly taskservice: TaskService
    ) {}

    @Post('/task')
    @UsePipes(new ValidationPipe({
        whitelist: true
    }))
    public async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskservice.createTask(createTaskDto);
    }
}