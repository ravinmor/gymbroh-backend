import { Exercise } from "../entities/Exercise";
import { ExerciseType } from "../entities/ExerciseType";
import { ExerciseRepository, ExerciseTypeRepository} from "../repositories";

type ExerciseRequest = {
  name: string;
  description: string;
  type_id: Exercise;
};

type ExerciseTypeRequest = {
  name: string;
  description: string;
};

export class ExerciseService {
  async listExercises(): Promise<Exercise[]> {
    const exercise = await ExerciseRepository().find();
    return exercise;
  }

  async listExercisesByType(type): Promise<Exercise[]> {
		const exercises = await ExerciseRepository().createQueryBuilder("exercises")
		.select(["exercises.id", "exercises.name", "exercises.description"])
		.innerJoin("exercise_types", "et", 'et.id = exercises.type_id')
		.where('et.name = :name', { name: type })
		.getMany();

    return exercises;
  }

  async storeExercise({ name, description, type_id }: ExerciseRequest): Promise<Exercise | Error> {
    const repo = ExerciseRepository();

    if (await repo.findOne({ name })) {
      return new Error("Exercise already exists");
    }

    const exercise = repo.create({ name, description, type_id });

    await repo.save(exercise);

    return exercise;
  }

  async listExerciseTypes(): Promise<ExerciseType[]> {
    const exerciseTypes = await ExerciseTypeRepository().find();
    return exerciseTypes;
  }

  async storeExerciseType({ name, description }: ExerciseTypeRequest): Promise<ExerciseType | Error> {
    const repo = ExerciseTypeRepository();

    if (await repo.findOne({ name })) {
      return new Error("Exercise type already exists");
    }

    const exerciseType = repo.create({ name, description });

    await repo.save(exerciseType);

    return exerciseType;
  }

  async returnExerciseByName(name): Promise<Exercise> {
    const exercise = ExerciseRepository().createQueryBuilder("exercise")
    .select(["exercise.id", "exercise.name", "exercise.description", "et.name", "et.description"])
    .innerJoin("exercise_types", "et", 'et.id = exercise.type_id')
    .where("exercise.name = :name", { name: name })
    .getOne();

    return exercise;
  }
}
