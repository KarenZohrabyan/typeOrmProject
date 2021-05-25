import { Exclude } from "class-transformer";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @ManyToOne(() => UserEntity, user => user.tasks, { eager: false})
    @Exclude()
    user: UserEntity;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}