import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { UserRepository } from "../repositories";
import { UserService } from "./UserService";
import { Role } from "../entities/Role";

type UserRequest = {
	email: string;
	password: string;
};

export class SessionService {
	async execute({ email, password }: UserRequest) {
		const repo = UserRepository();

		const user = await repo.findOne({ email });

		if (!user) {
			return new Error("Usuario não existe");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			return new Error("Email ou senha incorreta");
		}
		
		const userService = new UserService();

		const role = await userService.returnUserRolebyId(user.id) as Role

		const token = sign({}, process.env.SECRET_JWT, {
			subject: user.id,
		});
		
		return { 
			user: user.username,
			id: user.id,
			role: role.name,
			token
		}
	}
}
