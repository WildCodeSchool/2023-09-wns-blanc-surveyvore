import { MigrationInterface, QueryRunner } from "typeorm";

export class ModidyAnswerEntity1718356399216 implements MigrationInterface {
  name = "ModidyAnswerEntity1718356399216";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answer" ALTER COLUMN "content" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_answer" ALTER COLUMN "content" SET NOT NULL`
    );
  }
}
