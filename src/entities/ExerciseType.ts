import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Exercise } from "./Exercise";

@Entity("exercise_types")
export class ExerciseType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  
  @OneToMany(() => Exercise, exercise => exercise.type_id)
  exercises: Exercise[];
}
