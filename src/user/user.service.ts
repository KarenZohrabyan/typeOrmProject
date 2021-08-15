import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Role } from "src/utility/enums/role.enum";
import { RegisterDto } from "./dto/register.dto";
import { UpdateUser } from "./dto/update.dto";
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
        user.token = await this.authService.generateToken(email, Role.user);
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

        return await this.generateToken(user.email, user.role, user);
    }

    public async findUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findUserById(id);
    }

    public async updateUser(user: UserEntity, updateUser: UpdateUser): Promise<UserEntity> {
        updateUser.role ?
            await Object.assign(user, updateUser, this.generateToken(user.email, updateUser.role, user)) :
            await Object.assign(user, updateUser).save();

        return user;
    }

    public async generateToken(email: string, role: Role, user: UserEntity): Promise<{token: string}> {
        const token = await this.authService.generateToken(email, role);
        user.token = token;
        await user.save();
        return {token};
    }
}