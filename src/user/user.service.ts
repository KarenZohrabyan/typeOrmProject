import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "./entity/user.pg.entity";
import { UserRepository } from "./repo/user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    public async register(registerDto: RegisterDto): Promise<UserEntity> {
        return this.userRepository.register(registerDto);
    }
}