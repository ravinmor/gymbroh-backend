import { Schedule } from "../entities/Schedule";
import { User } from "../entities/User";
import { ScheduleRepository } from "../repositories";
import { ExerciseService } from "./ExerciseService";

interface ScheduleProps {
    user_id: string,
    exercise: string,
    day: string,
    repetitions: number,
    series: number,
    description: string
}

export class ScheduleService {
    async storeScheduledExercise(scheduleData: ScheduleProps): Promise<Schedule | Error> {
        const exerciseRepo = new ExerciseService();

        const exerciseInfo = await exerciseRepo.returnExerciseByName(scheduleData.exercise);
        
        const schedule = ScheduleRepository().create({ 
            user_id: scheduleData.user_id,
            exercise_id: exerciseInfo.id,
            day: scheduleData.day,
            repetitions: scheduleData.repetitions,
            series: scheduleData.series,
            description: scheduleData.description
        });

        await ScheduleRepository().save(schedule);
        return schedule;
    }

    async getScheduledExercisesByUserId(user_id) {
		const schedules = await ScheduleRepository().createQueryBuilder("schedules")
        .select([
            "schedules.id as id",
            "schedules.user_id as user_id",
            "schedules.exercise_id as exercise_id",
            "schedules.day as day",
            "schedules.repetitions as repetitions",
            "schedules.series as series",
            "schedules.created_at as created_at",
            "schedules.description as description",
            "e.name as name",
            "e.description as description",
            "et.name as type_name",
            "et.description as type"
        ])
		.leftJoin("exercises", "e", 'schedules.exercise_id = e.id')
		.leftJoin("exercise_types", "et", 'e.type_id = et.id')
		.where('schedules.user_id = :id', { id: user_id })
		.getRawMany();
        return schedules;
    }
}