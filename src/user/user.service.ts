import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { RegisterDto } from "./dto/register.dto";
import { UserValidation } from "./dto/user.validate";
import { UserEntity } from "./entity/user.pg.entity";
import { UserRepository } from "./repo/user.repository";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly authService: AuthService,
    ) {}

    public async register(registerDto: RegisterDto): Promise<UserEntity> {
        const { email } = registerDto;
        const ifUserExists = await this.userRepository.createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne()

        if(ifUserExists) {
            throw new ConflictException(`Username with "${email}" already exists`);
        }

        const user = await this.userRepository.register(registerDto);
        user.token = await this.authService.generateToken(email, ifUserExists.role);
        await user.save();
        return user;
    }

    public async userLogin(userValidation: UserValidation): Promise<{token: string}> {
        const { email, password } = userValidation;

        const user = await this.userRepository.createQueryBuilder('user')
            .where("user.email = :email", {email: email})
            .getOne()
        
        if(!user) {
            throw new BadRequestException('There is no user with that email!');
        }

        if(!await this.userRepository.validatePassword(password, user)) {
            throw new BadRequestException('You entered wrong credentials!');
        }

        const token = await this.authService.generateToken(email, user.role);
        user.token = token;
        await user.save();
        return {token};
    }

    public async findUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findUserById(id);
    }
}