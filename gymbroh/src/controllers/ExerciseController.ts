import { Request, Response } from "express";
import { ExerciseService } from "../services/ExerciseService";

export class ExerciseController {
	async listExercises(request: Request, response: Response) {
		const service = new ExerciseService();

		const exerciseTypes = await service.listExercises();

		return response.json(exerciseTypes);
	}
	
	async storeExercise(request: Request, response: Response) {
		const service = new ExerciseService();

		const exercise = await service.storeExercise(request.body)

		return response.json(exercise);
	}
	
}
