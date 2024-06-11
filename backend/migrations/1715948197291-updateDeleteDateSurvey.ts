import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDeleteDateSurvey1715948197291 implements MigrationInterface {
  name = "UpdateDeleteDateSurvey1715948197291";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "deleteDate"`);
    await queryRunner.query(`ALTER TABLE "survey" ADD "deleteDate" bigint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "deleteDate"`);
    await queryRunner.query(`ALTER TABLE "survey" ADD "deleteDate" Date`);
  }
}

