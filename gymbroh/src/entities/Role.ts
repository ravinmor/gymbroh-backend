import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity("roles")
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[]
  
  @ManyToMany(() => User)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  
  users: User[];
}
