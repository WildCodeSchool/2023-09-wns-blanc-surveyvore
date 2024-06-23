import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionAddSort1718308581974 implements MigrationInterface {
  name = "QuestionAddSort1718308581974";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ADD "sort" integer NOT NULL DEFAULT 0`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "sort"`);
  }
}
