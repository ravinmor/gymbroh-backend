import {
    Column,
    Entity,
    getRepository,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    RelationId,
  } from "typeorm";
  import { BaseEntity } from "./BaseEntity";
  import { Exercise } from "./Exercise";
  import { Permission } from "./Permission";
  import { Role } from "./Role";
  import { Schedule } from "./Schedule";
  import { User } from "./User";
  
  @Entity("images")
  export class Image extends BaseEntity {
    @Column()
    path: string;
  
    @ManyToOne(() => User, user => user.images )
    @JoinColumn({ name: "user_id" })
    user: User
  }
  