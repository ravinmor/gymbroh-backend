import { Request, Response } from "express";
import { ExerciseService } from "../services/ExerciseService";

export class ExerciseController {
	async listExercises(request: Request, response: Response) {
		const service = new ExerciseService();

		const exerciseTypes = await service.listExercises();

		return response.json(exerciseTypes);
	}

	async listExercisesByMuscularGroup(request: Request, response: Response) {
		const { type } = request.params;
		const service = new ExerciseService();

		const exercises = await service.listExercisesByType(type);
		
		return response.json(exercises);
	}
	
	async storeExercise(request: Request, response: Response) {
		const service = new ExerciseService();

		const exercise = await service.storeExercise(request.body)

		return response.json(exercise);
	}

	async listExercisesTypes(request: Request, response: Response) {
		const service = new ExerciseService();

		const exerciseTypes = await service.listExerciseTypes();

		return response.json(exerciseTypes);
	}
	
	async storeExerciseType(request: Request, response: Response) {
		const service = new ExerciseService();

		const exerciseType = await service.storeExerciseType(request.body)

		return response.json(exerciseType);
	}
	
}
