import { Entity, Column, OneToMany, JoinTable, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ExerciseType } from "./ExerciseType";
import { Schedule } from "./Schedule";
import { User } from "./User";

@Entity("exercises")
export class Exercise extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
  
  @ManyToOne(() => ExerciseType, exerciseType => exerciseType.id)
  @JoinColumn({name: 'type_id', referencedColumnName: 'id'})
  type_id: ExerciseType  

  @ManyToMany(() => Schedule)
  @JoinTable({
    name: "schedules",
    joinColumns: [{ name: "exercise_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  exercises: Schedule[]
}
