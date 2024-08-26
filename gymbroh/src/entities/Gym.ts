import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("gym")
export class Gym extends BaseEntity {
  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  uf: string;
}
