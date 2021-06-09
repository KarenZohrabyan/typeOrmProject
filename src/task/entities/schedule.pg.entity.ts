import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "./task.pg.entity";

@Entity({ name: "schedule" })
export class ScheduleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'integer'})
    public count: number;

    @ManyToMany(() => TaskEntity, task => task.sch, { onDelete: "CASCADE"})
    task: TaskEntity;
}