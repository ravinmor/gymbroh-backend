import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangingExercisesColumnName1701730858908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exercises" RENAME COLUMN "date_created" TO "created_at";
            ALTER TABLE "exercises" RENAME COLUMN "date_updated" TO "updated_at";
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "exercises" RENAME COLUMN "created_at" TO "date_created";
            ALTER TABLE "exercises" RENAME COLUMN "updated_at" TO "date_updated";
        `)
    }

}
