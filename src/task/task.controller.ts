import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { User } from "src/auth/guards/user.decorator";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { Roles } from "src/utility/decorators/roles.decorator";
import { Role } from "src/utility/enums/role.enum";
import { RolesGuard } from "src/utility/guards/roles.guard";
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.user)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        whitelist: true
    }))
    public async createTask(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @User() user: UserEntity): Promise<TaskEntity> {
        return this.taskservice.createTask(createTaskDto, user);
    }

    @Get('/getUserTasks')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.user)
    public async getUserTasks(@User() user: UserEntity): Promise<TaskEntity[]> {
        return this.taskservice.getUserTasks(user);
    }

    @Get('/getSelectedTasks')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.user)
    public async getSelectedTasks(@User() user: UserEntity): Promise<TaskEntity[]> {
        return this.taskservice.getSelectedTasks(user);
    }
}