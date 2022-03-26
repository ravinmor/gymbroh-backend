import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateExercises1643178216214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "exercises",
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
                name: "type_id",
                type: "uuid",
              },
              {
                name: "created_at",
                type: "timestamp",
                default: "now()",
              },
            ],
            foreignKeys: [
                {
                  columnNames: ["type_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "exercise_types",
                  name: "fk_exercise_types_",
                  onDelete: "RESTRICT",
                  onUpdate: "CASCADE",
                }
              ],
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercises");
    }

}
