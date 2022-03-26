import { Request, Response } from "express";
import { ScheduleService } from "../services/ScheduleService";
import { UserService } from "../services/UserService";

export class ScheduleController {
  async schedule(request: Request, response: Response) {
    const schedule = new ScheduleService();

    const scheduled = await schedule.storeScheduledExercise(request.body);

    return response.json(scheduled);
  }

  async getScheduledExercisesByUserId(request: Request, response: Response) {
    const { user_id } = request.params;
    
    const schedule = new ScheduleService();

    const schedules = await schedule.getScheduledExercisesByUserId(user_id);

    return response.json(schedules);
  }
}
