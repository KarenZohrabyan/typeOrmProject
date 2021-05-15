import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Type } from "class-transformer";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./entity/user.pg.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags} from '@nestjs/swagger'
import { UserValidation } from "./dto/user.validate";

@Controller('users')
@ApiTags('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('/register')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe(
        {
            transform: true,
            whitelist: true
        }
    ))
    public async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<UserEntity> {
        return this.userService.register(registerDto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    public async userLogin(@Body() userValidation: UserValidation): Promise<{token: string}> {
        return this.userService.userLogin(userValidation);
    }

    @Get('/user/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new ValidationPipe({
        whitelist: true,
    }))
    public async findUserById(@Param('id' ,ParseIntPipe) id: number): Promise<UserEntity> {
        return this.userService.findUserById(id);
    }
}