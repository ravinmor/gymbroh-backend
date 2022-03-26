import { Entity, Column, OneToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("schedules")
export class Schedule extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  exercise_id: string;

  @Column()
  day: string;

  @Column()
  repetitions: number;

  @Column()
  series: number;

  @Column()
  description: string;
}
