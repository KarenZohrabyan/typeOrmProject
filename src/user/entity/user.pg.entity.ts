import { Exclude } from "class-transformer";
import { Role } from "src/utility/enums/role.enum";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'users'})
@Unique(['email'])
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @Column({type: 'varchar'})
    public email: string;
 
    @Column({type: 'varchar'})
    @Exclude()
    public password: string;

    @Column({type: 'varchar'})
    public token: string;

    @Column({ type: 'varchar'})
    public role: Role = Role.user;

    @Column({type: 'varchar'})
    @Exclude()
    public salt: string;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}