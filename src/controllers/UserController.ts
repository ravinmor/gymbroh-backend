import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
	async handle(request: Request, response: Response) {
		const createUserService = new UserService();
		
		const result = await createUserService.store(request.body, request.files as Express.Multer.File[]);

		if (result instanceof Error) {
			return response.status(400).json(result.message);
		}

		return response.json(result);
	}

	async show(request: Request, response: Response) {
		const UsersService = new UserService();
		const { id } = request.params;

		const user = await UsersService.show(id);

		return response.json(user);
	}

	async update(request: Request, response: Response) {
		const createUserService = new UserService();
		
		const result = await createUserService.update(request.params.id, request.body, request.files as Express.Multer.File[]);

		if (result instanceof Error) {
			return response.status(400).json(result.message);
		}

		return response.json(result);
	}

	async list(request: Request, response: Response) {
		const UsersService = new UserService();

		const users = await UsersService.list();

		return response.json(users);
	}

	async returnUserRolebyId(request: Request, response: Response) {
		const UsersService = new UserService();

		const { user_id } = request.params;

		const users = await UsersService.returnUserRolebyId(user_id);

		return response.json(users);
	}

	async createRelation(request: Request, response: Response) {
		const createUserService = new UserService();
		
		const result = await createUserService.createRelationBetweenUsers(request.body);

		if (result instanceof Error) {
			return response.status(400).json(result.message);
		}

		return response.json(result);
	}

	async getFatherByUserId(request: Request, response: Response) {
		const service = new UserService();

		const { id } = request.params;
	
		const father = await service.getUserFatherByUserId(id);

		return response.json(father);
	}
}
