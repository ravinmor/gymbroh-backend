import { hash } from "bcryptjs";
import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { RoleRepository, UserRepository } from "../repositories";
import { CreateUserAccessControlListService } from "./CreateUserAccessControlListService";
import { RoleService } from "./RoleService";


type UserRequest = {
	username: string;
	user_lastname: string;
	email: string;
	birthdate: string;
	gender: string;
	cpf: string;
	cnpj: string;
	postal_code: string;
	street: string;
	address_number: string;
	neighborhood: string;
	city: string;
	state_initials: string;
	password: string;
	role: string
};


type UserACLRequest = {
	userId: string;
	roles: string[];
	permissions: string[];
  };

type UserRelationIds = {
	father: string;
	son: string;
};
export class UserService {
	async list(): Promise<User[]> {
		const users = await UserRepository().find();
		return users;
	}
	
	async store(userData: UserRequest, files: Express.Multer.File[]): Promise<Error | User> {
		const roleService = new RoleService();

		const existUser = await UserRepository()
		.createQueryBuilder('users')
		.where({ email: userData.email }).getOne();
	
		if (existUser) {
		  return new Error("User already exists");
		}
	
		const images = files.map(image => {
		  return { path: image.filename}
		});
	
		const passwordHash = await hash(userData.password, 8);
	
		const user = UserRepository().create({
		  username: userData.username,
		  user_lastname: userData.user_lastname,
		  email: userData.email,
		  birthdate: userData.birthdate,
		  gender: userData.gender,
		  cpf: userData.cpf,
		  cnpj: userData.cnpj,
		  postal_code: userData.postal_code,
		  street: userData.street,
		  address_number: userData.address_number,
		  neighborhood: userData.neighborhood,
		  city: userData.city,
		  state_initials: userData.state_initials,
		  images: images,
		  password: passwordHash,
		});
	
		const savedUser = await UserRepository().save(user);
	
		const cli = new CreateUserAccessControlListService();

		const cliContent = {
			userId: savedUser.id,
			roles: [ await roleService.returnRoleIdByName(userData.role) ],
			permissions: []
		} as UserACLRequest

		cli.execute(cliContent)

		return user;
	}
	
	async update(id: string, userData: UserRequest, files: Express.Multer.File[]): Promise<Error | User> {
		const passwordHash = await hash(userData.password, 8);
	
		const userToUpdate = await UserRepository().findOne({ where: {id: id}});
		
		userToUpdate.username = userData.username;
		userToUpdate.user_lastname = userData.user_lastname;
		userToUpdate.email = userData.email;
		userToUpdate.birthdate = userData.birthdate;
		userToUpdate.gender = userData.gender;
		userToUpdate.cpf = userData.cpf;
		userToUpdate.cnpj = userData.cnpj;
		userToUpdate.postal_code = userData.postal_code;
		userToUpdate.street = userData.street;
		userToUpdate.address_number = userData.address_number;
		userToUpdate.neighborhood = userData.neighborhood;
		userToUpdate.city = userData.city;
		userToUpdate.state_initials = userData.state_initials;
		userToUpdate.password = passwordHash;
		
		await UserRepository().save(userToUpdate);
	
		return userToUpdate;
	}

	async show(userId: string): Promise<User> {
		const user = await UserRepository().findOne({
			where: {
				id: userId
			}
		});
		return user;
	}

	async getUserByRoleId(roleId: string): Promise<User[]> {
		const users = UserRepository().createQueryBuilder("users")
		.innerJoin("users_roles", "ur", 'ur.user_id = users.id')
		.innerJoin("roles", "r", `r.id = ur.role_id AND r.name = ${roleId}'`)
		.getMany();

		return users;
	}
	
	async getUserByRoleName(roleName: string): Promise<User[]> {
		const users = UserRepository().createQueryBuilder("users")
		.select([
			"users.id",
			"users.username",
			"users.user_lastname",
			"users.street",
			"users.address_number",
			"users.neighborhood",
			"users.city",
			"users.state_initials"
		])
		.innerJoin("users_roles", "ur", 'ur.user_id = users.id')
		.innerJoin("roles", "r", `r.id = ur.role_id AND r.name = '${roleName}'`)
		.getMany();

		return users;
	}

	async getUsersSonsByFatherId(userFatherId: string): Promise<User[]> {
		const users = UserRepository().createQueryBuilder("users")
		.select([
			"users.id",
			"users.username",
			"users.user_lastname",
			"users.email",
			"users.birthdate",
			"users.gender",
			"users.cpf",
			"users.cnpj",
			"users.postal_code",
			"users.street",
			"users.address_number",
			"users.neighborhood",
			"users.city",
			"users.state_initials"
		])
		.innerJoin("users_relations", "ure", 'ure.user_son_id = users.id')
		.where("ure.user_father_id = :id", { id: userFatherId })
		.getMany();

		return users;
	}

	
	async getUserFatherByUserId(userSonId: string): Promise<User[]> {
		const users = UserRepository().createQueryBuilder("users")
		.select([
			"users.id",
			"users.username",
			"users.user_lastname",
			"users.email",
			"users.birthdate",
			"users.gender",
			"users.cpf",
			"users.cnpj",
			"users.postal_code",
			"users.street",
			"users.address_number",
			"users.neighborhood",
			"users.city",
			"users.state_initials"
		])
		.innerJoin("users_relations", "ure", 'ure.user_father_id = users.id')
		.where("ure.user_son_id = :id", { id: userSonId })
		.getMany();

		return users;
	}

	async returnUserRolebyId(user_id: string): Promise<Role> {
		const role = await RoleRepository().createQueryBuilder("roles")
		.select(["roles.name"])
		.innerJoin("users_roles", "ur", 'ur.role_id = roles.id')
		.where('ur.user_id = :id', { id: user_id })
		.getOne();
		
		return role;
	}

	async createRelationBetweenUsers(users: UserRelationIds) {
		const repo = UserRepository()
		const fatherUser = await repo.findOne({ 
			where: { id: users.father }
		});
		

		if(!fatherUser) {
		  return new Error("User FTR Invalid");
		}

		const sonUser = await repo.findOne({ where: { id: users.son}});
		if(!sonUser) {
		  return new Error("User SN Invalid");
		}

		const usersSons = await this.getUsersSonsByFatherId(fatherUser.id)
		
		console.log([ sonUser, ... usersSons ]);
		fatherUser.users_son = [ sonUser, ... usersSons ]
		
		const result = await repo.save(fatherUser);

		return fatherUser;
	}
}