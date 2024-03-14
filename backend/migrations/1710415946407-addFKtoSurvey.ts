import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFKtoSurvey1710415946407 implements MigrationInterface {
    name = 'AddFKtoSurvey1710415946407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" ADD "stateId" uuid`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_fdecf525064b2171d83eeeb4cc8" FOREIGN KEY ("stateId") REFERENCES "survey_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_fdecf525064b2171d83eeeb4cc8"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "stateId"`);
    }

}
