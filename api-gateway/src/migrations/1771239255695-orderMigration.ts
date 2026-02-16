import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class OrderMigration1771239255695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "message",
                        type: "varchar",
                        isNullable: false,

                    },
                    {
                        name:'status',
                        type:'enum',
                        enum:['pending','published'],
                        default:"'pending'",
                    },
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("orders");
    }

}