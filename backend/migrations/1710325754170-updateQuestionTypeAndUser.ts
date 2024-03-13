import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuestionTypeAndUser1710325754170
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "question_type" ADD "icon" character varying`
        );
        await queryRunner.query(
            `ALTER TABLE "question_type" ADD "slug" character varying`
        );

        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "hashedPassword" TO "password" `
        );
        await queryRunner.query(
            `ALTER TABLE "user" RENAME COLUMN "roleId" TO "role_id" `
        );

        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`
        );

        await queryRunner.query(
            `INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Charlie', 'FEIX', '$argon2id$v=19$m=65536,t=3,p=4$C4GDRPb0c/k6DtGvN6W8hw$R/WgvbxW8Xuj2vqyiqXnPJG73l8kNt6gn/Qe6RJwz9Q', 'charlie.feix@gmail.com')`
        );
        await queryRunner.query(`INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Cyrille', 'AQUILINA', '$argon2id$v=19$m=65536,t=3,p=4$SjVBeaTDkliIeVjAL8U4BQ$hNZzz48FRR7qNpe8NLxQnOilvVdL8dmFLbdlLoWsj0c
        ', 'cyrille.aquilina@gmail.com')`);
        await queryRunner.query(`INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Matthieu', 'GUINET', '$argon2id$v=19$m=65536,t=3,p=4$h3rH5d/4vYVp78waL4b+pg$9wGbL7mvSzzGZWyUW8TrdIbnw5flBIgcjzlgGS8ZZDI
        ', 'matthieuguinet@gmail.com')`);
        await queryRunner.query(
            `UPDATE "user" SET "role_id" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'charlie.feix@gmail.com'`
        );
        await queryRunner.query(
            `UPDATE "user" SET "role_id" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'cyrille.aquilina@gmail.com'`
        );
        await queryRunner.query(
            `UPDATE "user" SET "role_id" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'matthieuguinet@gmail.com'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
