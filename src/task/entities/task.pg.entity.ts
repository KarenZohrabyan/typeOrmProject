import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string
}