import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSchedule1643767213314 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "schedules",
                columns: [
                    { name: "id", isPrimary: true, type: "uuid" },
                    {
                        name: "user_id",
                        type: "uuid",
                    }, {
                        name: "exercise_id",
                        type: "uuid",
                    }, {
                        name: "day",
                        type: "varchar",
                    }, {
                        name: "repetitions",
                        type: "numeric",
                    }, {
                        name: "series",
                        type: "numeric",
                    }, {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        name: "fk_user_schedule_",
                        onDelete: "RESTRICT",
                        onUpdate: "CASCADE",
                    }, {
                        columnNames: ["exercise_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "exercises",
                        name: "fk_exercise_schedule_",
                        onDelete: "RESTRICT",
                        onUpdate: "CASCADE",
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("schedules");
    }

}
