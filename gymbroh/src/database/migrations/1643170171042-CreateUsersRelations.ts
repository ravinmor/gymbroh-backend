import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersRelations1643170171042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_relations",
        columns: [
          { name: "user_father_id", type: "uuid" },
          { name: "user_son_id", type: "uuid" },
        ],
        foreignKeys: [
          {
            columnNames: ["user_father_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_users_fathers_roles_",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            columnNames: ["user_son_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            name: "fk_users_sons_permissions",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_relations");
  }
}
