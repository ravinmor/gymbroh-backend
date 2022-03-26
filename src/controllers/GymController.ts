import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class GymController {
  async listGyms(request: Request, response: Response) {
    const service = new UserService();

    const gyms = await service.getUserByRoleName("gym");

    return response.json(gyms);
  }
  
  async listEntities(request: Request, response: Response) {
    const service = new UserService();

    const { id } = request.params;

    const personals = await service.getUsersSonsByFatherId(id);

    return response.json(personals);
  }
}
