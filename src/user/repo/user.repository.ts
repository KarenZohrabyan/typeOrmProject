import { BadRequestException, ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RegisterDto } from "../dto/register.dto";
import { UserEntity } from "../entity/user.pg.entity";
import * as bcrypt from 'bcrypt';
import { UserValidation } from 'src/user/dto/user.validate';
import { AuthService } from "src/auth/auth.service";

@EntityRepository(UserEntity) 
export class UserRepository extends Repository<UserEntity> {
    public async register (registerDto: RegisterDto): Promise<UserEntity> {
        const { password } = registerDto;

        const salt = await bcrypt.genSalt();
        registerDto.password = await this.hashPassword(password, salt);

        const user = this.create(registerDto);
        user.salt = salt;
        return user;
    }

    public async findUserById(id: number): Promise<UserEntity> {
        const user = await this.createQueryBuilder("user")
            .where("user.id = :id", {id: id})
            .getOne()
        
        if(!user) {
            throw new BadRequestException('There is no user with that id!');
        }

        return user;
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public async validatePassword(password: string ,user: UserEntity): Promise<boolean> {
        const hash = await bcrypt.hash(password, user.salt);
        return hash === user.password;
    }
}