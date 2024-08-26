import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

type RoleRequest = {
  name: string;
  description: string;
};

export class RoleService {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repo = RoleRepository();

    if (await repo.findOne({ name })) {
      return new Error("Role already exists");
    }

    const role = repo.create({ name, description });

    await repo.save(role);

    return role;
  }
  
  async list(): Promise<Role[]> {
    const roles = await RoleRepository().find();
    return roles;
  }
  
  async returnRoleIdByName(name): Promise<String> {
    const role = await RoleRepository().findOne({ where:{
      name: name
    } });
    return role.id;
  }
}
