import { User } from "../entities/User";
import { UserRepository } from "../repositories";

export class UserService {
  async execute(): Promise<User[]> {
    const users = await UserRepository().find();
    return users;
  }
}