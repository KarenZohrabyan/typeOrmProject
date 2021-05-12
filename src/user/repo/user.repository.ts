import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.pg.entity";

@EntityRepository(UserEntity) 
export class UserRepository extends Repository<UserEntity> {
    
}