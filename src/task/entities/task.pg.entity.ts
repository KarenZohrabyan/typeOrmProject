import { Exclude } from "class-transformer";
import { UserEntity } from "src/user/entity/user.pg.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleEntity } from "./schedule.pg.entity";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @ManyToOne(() => UserEntity, user => user.tasks, { eager: false, onDelete: "CASCADE" })
    @Exclude()
    user: UserEntity;

    @OneToMany(() => ScheduleEntity, sch => sch.task, { eager: false })
    sch: ScheduleEntity;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}