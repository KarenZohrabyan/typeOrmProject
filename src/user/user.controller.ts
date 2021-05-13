import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { Type } from "class-transformer";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./entity/user.pg.entity";
import { UserService } from "./user.service";

@Controller('users')
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
}