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
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`
        );

        await queryRunner.query(
            `INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Charlie', 'FEIX', '$argon2id$v=19$m=65536,t=3,p=4$J7CBDt5/YzDRf+OU3hhD3g$R0cYf+s2mbWGLjR0qL0FavSZNhAZy/xbqh2IAHvVErE', 'charlie.feix@gmail.com')`
        );
        await queryRunner.query(`INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Cyrille', 'AQUILINA', '$argon2id$v=19$m=65536,t=3,p=4$SjVBeaTDkliIeVjAL8U4BQ$hNZzz48FRR7qNpe8NLxQnOilvVdL8dmFLbdlLoWsj0c
        ', 'cyrille.aquilina@gmail.com')`);
        await queryRunner.query(`INSERT INTO "user" (firstname, lastname, password, email) VALUES ('Matthieu', 'GUINET', '$argon2id$v=19$m=65536,t=3,p=4$h3rH5d/4vYVp78waL4b+pg$9wGbL7mvSzzGZWyUW8TrdIbnw5flBIgcjzlgGS8ZZDI
        ', 'matthieuguinet@gmail.com')`);
        await queryRunner.query(
            `UPDATE "user" SET "roleId" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'charlie.feix@gmail.com'`
        );
        await queryRunner.query(
            `UPDATE "user" SET "roleId" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'cyrille.aquilina@gmail.com'`
        );
        await queryRunner.query(
            `UPDATE "user" SET "roleId" = (SELECT id FROM role WHERE name = 'ADMIN') WHERE email = 'matthieuguinet@gmail.com'`
        );

        await queryRunner.query(
            `UPDATE "question_type" SET ("icon", "slug") = ('text-box-edit', 'texte-libre') WHERE type = 'Texte libre'`
        );

        await queryRunner.query(
            `UPDATE "question_type" SET ("icon", "slug") = ('list-check', 'choix-multiple') WHERE type = 'Choix multiple'`
        );

        await queryRunner.query(
            `UPDATE "question_type" SET ("icon", "slug") = ('check-circle', 'choix-unique') WHERE type = 'Choix unique'`
        );

        await queryRunner.query(
            `UPDATE "question_type" SET ("icon", "slug") = ('checkbox', 'case-a-cocher') WHERE type = 'Case à cocher'`
        );

        await queryRunner.query(
            `UPDATE "question_type" SET ("icon", "slug") = ('calendar-day', 'date-periode') WHERE type = 'Date / période'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
