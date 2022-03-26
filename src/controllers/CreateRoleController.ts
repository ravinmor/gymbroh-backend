import { Request, Response } from "express";
import { RoleService } from "../services/RoleService";

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const roleService = new RoleService();

    const result = await roleService.execute({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
  
  async list(request: Request, response: Response) {
    const roleService = new RoleService();

    const result = await roleService.list();

    return response.json(result);
  }
}
