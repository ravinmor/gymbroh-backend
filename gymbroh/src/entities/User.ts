import {
	Column,
	Entity,
	getRepository,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	RelationId,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Exercise } from "./Exercise";
import { Image } from "./Image";
import { Permission } from "./Permission";
import { Role } from "./Role";
import { Schedule } from "./Schedule";

@Entity("users")
export class User extends BaseEntity {
	@Column()
	username: string;

	@Column()
	user_lastname: string;

	@Column()
	email: string;

	@Column()
	birthdate: string;

	@Column()
	gender: string;

	@Column()
	cpf: string;

	@Column()
	cnpj: string;

	@Column()
	postal_code: string;

	@Column()
	street: string;

	@Column()
	address_number: string;

	@Column()
	neighborhood: string;

	@Column()
	city: string;

	@Column()
	state_initials: string;

	@Column()
	password: string;

	@ManyToMany(() => Permission)
	@JoinTable({
		name: "users_permissions",
		joinColumns: [{ name: "user_id" }],
		inverseJoinColumns: [{ name: "permission_id" }],
	})
	permissions: Permission[];

	@ManyToMany(() => User, user => user.users_son)
	@JoinTable({
		name: "users_relations",
		joinColumns: [{
			name: "user_son_id",
			referencedColumnName: "id"
		}],
		inverseJoinColumns: [{
			name: "user_father_id",
			referencedColumnName: "id"
		}],
	})
	users_father: User[]

	@ManyToMany(() => User, user => user.users_father)
	@JoinTable({
		name: "users_relations",
		joinColumns: [{
			name: "user_father_id",
			referencedColumnName: "id"
		}],
		inverseJoinColumns: [{
			name: "user_son_id",
			referencedColumnName: "id"
		}],
	})
	users_son: User[]

	@ManyToMany(() => Schedule)
	@JoinTable({
		name: "schedules",
		joinColumns: [{ name: "user_id" }],
		inverseJoinColumns: [{ name: "exercise_id" }],
	})
	exercises: Schedule[]
	
	@ManyToMany(() => Role)
	@JoinTable({
		name: "users_roles",
		joinColumns: [{ name: "user_id" }],
		inverseJoinColumns: [{ name: "role_id" }],
	})
	roles: Role[];

	@OneToMany(() => Image, image => image.user, {
		cascade: ['insert', 'update']
	})
	@JoinColumn({ name: 'user_id' })
  	images: Image[]
}
