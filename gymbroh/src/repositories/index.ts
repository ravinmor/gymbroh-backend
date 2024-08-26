import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { Permission } from "../entities/Permission";
import { Exercise } from "../entities/Exercise";
import { Schedule } from "../entities/Schedule";

export const UserRepository = () => {
  return getRepository(User);
};

export const RoleRepository = () => {
  return getRepository(Role);
};

export const PermissionRepository = () => {
  return getRepository(Permission);
};

export const ProductRepository = () => {
  return getRepository(Product);
};

export const ExerciseRepository = () => {
  return getRepository(Exercise);
};

export const ScheduleRepository = () => {
  return getRepository(Schedule);
};