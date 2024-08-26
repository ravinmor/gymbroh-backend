import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUsersExtraColumns1644327285158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn(
            {
                name: "user_lastname",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "email",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "birthdate",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "gender",
                type: "boolean",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "cpf",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "cnpj",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "postal_code",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "street",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "address_number",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "neighborhood",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "city",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn(
            {
                name: "state_initials",
                type: "varchar",
                isNullable: true
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'user_lastname');
        await queryRunner.dropColumn('users', 'email');
        await queryRunner.dropColumn('users', 'birthdate');
        await queryRunner.dropColumn('users', 'gender');
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'cnpj');
        await queryRunner.dropColumn('users', 'postal_code');
        await queryRunner.dropColumn('users', 'street');
        await queryRunner.dropColumn('users', 'address_number');
        await queryRunner.dropColumn('users', 'neighborhood');
        await queryRunner.dropColumn('users', 'city');
        await queryRunner.dropColumn('users', 'state_initials');
    }

}
