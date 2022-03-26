import { Router } from "express";
import Multer from "multer";

import uploadConfig from "./config/upload";
import { CreatePermissionController } from "./controllers/CreatePermissionController";
import { CreateProductController } from "./controllers/CreateProductController";
import { CreateRoleController } from "./controllers/CreateRoleController";
import { CreateRolePermissionController } from "./controllers/CreateRolePermissionController";
import { CreateUserAccessControlListController } from "./controllers/CreateUserAccessControlListController";
import { UserController } from "./controllers/UserController";
import { ExerciseController } from "./controllers/ExerciseController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { GymController } from "./controllers/GymController";
import { ScheduleController } from "./controllers/ScheduleController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can, is } from "./middleware/permissions";

const routes = Router();
const upload = Multer(uploadConfig);

const adminRole = [
  "admin"
];
const gymRole = [
  "admin",
  "gym"
];
const personalRole = [
  "admin",
  "gym",
  "personal"
];
const studentRole = [
  "admin",
  "gym",
  "personal",
  "student"
];


routes.get("/users", new UserController().list);
routes.post("/users", upload.array('images'), new UserController().handle);
routes.get("/users/:id", upload.array('images'), new UserController().show);
routes.put("/users/:id", upload.array('images'), new UserController().update);
routes.post("/users/createRelation", ensuredAuthenticated(), upload.array('images'), new UserController().createRelation);
routes.get("/users/getFather/:id", new UserController().getFatherByUserId);
routes.post("/login", new SessionController().handle);

routes.get("/roles", ensuredAuthenticated(), is(adminRole), new CreateRoleController().list);
routes.post("/roles", ensuredAuthenticated(), is(adminRole), new CreateRoleController().handle);
routes.post("/permissions", ensuredAuthenticated(), is(adminRole), new CreatePermissionController().handle);
routes.get("/permissions", ensuredAuthenticated(), is(adminRole), new CreatePermissionController().list);
routes.post("/users/acl", ensuredAuthenticated(), is(adminRole), new CreateUserAccessControlListController().handle);
routes.post("/roles/:roleId", ensuredAuthenticated(), is(adminRole), new CreateRolePermissionController().handle);
routes.get("/exerciseTypes", ensuredAuthenticated(), is(gymRole), new ExerciseController().listExercisesTypes);
routes.post("/exerciseTypes", ensuredAuthenticated(), is(adminRole), new ExerciseController().storeExerciseType);
routes.get("/exercises", ensuredAuthenticated(), is(adminRole), new ExerciseController().listExercises);
routes.get("/exercisesByType/:type", ensuredAuthenticated(), is(adminRole), new ExerciseController().listExercisesByMuscularGroup);
routes.post("/exercises", ensuredAuthenticated(), is(adminRole), new ExerciseController().storeExercise);

routes.get("/admin/listGym", new GymController().listGyms);
routes.get("/list/:id", new GymController().listEntities);
routes.post("/schedules", upload.any(), ensuredAuthenticated(), new ScheduleController().schedule);
routes.get("/schedules/:user_id", new ScheduleController().getScheduledExercisesByUserId);

routes.get("/returnUserRole/:user_id", new UserController().returnUserRolebyId);

export { routes };