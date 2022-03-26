import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddSchedulesExtraColumns1645415548872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('schedules', new TableColumn({
            name: "description",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schedules', 'description');
    }

}
