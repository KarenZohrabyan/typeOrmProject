import { UserEntity } from "src/user/entity/user.pg.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @ManyToOne(() => UserEntity, user => user.tasks, { eager: false})
    user: UserEntity;
}