import { getRepository } from 'typeorm';
import { ExerciseRepository } from "../../../repositories"; // Supondo que você tenha uma entidade Exercise
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const seedExercises = async () => {
  const exercisesDir = path.join(__dirname, 'exercises');
  const repo = ExerciseRepository();

  const exerciseFolders = fs.readdirSync(exercisesDir);

  for (const folder of exerciseFolders) {
    const exercisePath = path.join(exercisesDir, folder);
    const jsonPath = path.join(exercisePath, 'exercise.json');
    
    if (fs.existsSync(jsonPath)) {
      const exerciseData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

      // Diretório onde as imagens estão localizadas
      const imagesPath = path.join('exercises', folder, 'images');

      const newExercise = repo.create({
        id: uuidv4(),
        name: exerciseData.name,
        aliases: exerciseData.aliases || [],
        primary_muscles: exerciseData.primaryMuscles,
        secondary_muscles: exerciseData.secondaryMuscles || [],
        force: exerciseData.force,
        level: exerciseData.level,
        mechanic: exerciseData.mechanic,
        equipment: exerciseData.equipment,
        category: exerciseData.category,
        instructions: exerciseData.instructions || [],
        description: exerciseData.description || '',
        tips: exerciseData.tips || [],
        images: fs.existsSync(path.join(exercisePath, 'images')) ? imagesPath : null, // Salva apenas o caminho da pasta de imagens
      });

      await repo.save(newExercise);
      console.log(`Exercise ${exerciseData.name} has been seeded.`);
    }
  }

  console.log('> Seeding complete.');
};