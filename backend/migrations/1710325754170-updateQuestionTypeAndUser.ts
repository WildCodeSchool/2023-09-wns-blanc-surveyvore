import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuestionTypeAndUser1710325754170
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
      `ALTER TABLE "question_type" ADD "icon" character varying`
    );

    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "hashedPassword" TO "password" `
    );

    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`
    );

    await queryRunner.query(
      `UPDATE "question_type" SET icon = 'text-box-edit' WHERE type = 'text'`
    );

    await queryRunner.query(
      `UPDATE "question_type" SET icon = 'list-check' WHERE type = 'checkboxes'`
    );

    await queryRunner.query(
      `UPDATE "question_type" SET icon = 'check-circle' WHERE type = 'radio'`
    );

    await queryRunner.query(
      `UPDATE "question_type" SET icon = 'checkbox' WHERE type = 'checkbox'`
    );

    await queryRunner.query(
      `UPDATE "question_type" SET icon = 'calendar-day' WHERE type = 'date'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

