import { Exercise } from "../entities/Exercise";
import { ExerciseRepository } from "../repositories";


type ExerciseRequest = {
  name: string;
  aliases: string;
  primary_muscles: string;
  secondary_muscles: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  category: string;
  instructions: string;
  description: string;
  tips: string;
};

export class ExerciseService {
  async listExercises(): Promise<Exercise[]> {
    const exercise = await ExerciseRepository().find();
    return exercise;
  }
  
  async storeExercise(exerciseData: ExerciseRequest): Promise<Exercise | Error> {
    const repo = ExerciseRepository();

    if (await repo.findOne({ name: exerciseData.name })) {
      return new Error("Exercise already exists");
    }

    const exercise = repo.create({
      name: exerciseData.name,
      aliases: exerciseData.aliases,
      primary_muscles: exerciseData.primary_muscles,
      secondary_muscles: exerciseData.secondary_muscles,
      force: exerciseData.force,
      level: exerciseData.level,
      mechanic: exerciseData.mechanic,
      equipment: exerciseData.equipment,
      category: exerciseData.category,
      instructions: exerciseData.instructions,
      description: exerciseData.description,
      tips: exerciseData.tips,
      date_updated: Date.now(),
    });

    await repo.save(exercise);

    return exercise;
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
