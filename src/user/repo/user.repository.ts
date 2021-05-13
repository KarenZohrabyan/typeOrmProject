import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RegisterDto } from "../dto/register.dto";
import { UserEntity } from "../entity/user.pg.entity";
import * as bcrypt from 'bcrypt';
// import { bcrypt } from 'bcrypt';

@EntityRepository(UserEntity) 
export class UserRepository extends Repository<UserEntity> {
    public async register (registerDto: RegisterDto): Promise<UserEntity> {
        const { email, password } = registerDto;
        const ifUserExists = await this.findOne({email});

        if(ifUserExists) {
            throw new ConflictException(`Username with "${email}" already exists`);
        }
        const salt = await bcrypt.genSalt();
        registerDto.password = await this.hashPassword(password, salt);

        const user = this.create(registerDto);
        user.salt = salt;
        await user.save();
        return user;
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}