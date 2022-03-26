import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateImages1644531130457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "images",
                columns: [
                    { name: "id", isPrimary: true, type: "uuid" },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "path",
                        type: "varchar",
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
                        name: "fk_user_image_",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("images");
    }
}
