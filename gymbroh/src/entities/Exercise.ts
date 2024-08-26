import { Entity, Column, OneToMany, JoinTable, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Schedule } from "./Schedule";
import { User } from "./User";

@Entity("exercises")
export class Exercise extends BaseEntity {
  @Column()
  name: string;

  @Column()
  aliases: string;

  @Column()
  primary_muscles: string;

  @Column()
  secondary_muscles: string;

  @Column()
  force: string;

  @Column()
  level: string;

  @Column()
  mechanic: string;

  @Column()
  equipment: string;

  @Column()
  category: string;

  @Column()
  instructions: string;

  @Column()
  description: string;

  @Column()
  tips: string;

  @Column()
  date_updated: Date;

  @ManyToMany(() => Schedule)
  @JoinTable({
    name: "schedules",
    joinColumns: [{ name: "exercise_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  exercises: Schedule[]

  @Column()
  images: string;
}
