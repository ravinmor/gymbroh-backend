import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateExerciseExerciseTypes1643176419324 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "exercise_types",
            columns: [
              { name: "id", isPrimary: true, type: "uuid" },
              {
                name: "name",
                type: "varchar",
              },
              {
                name: "description",
                type: "varchar",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
            ],
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise_types");
    }

}
