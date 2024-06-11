import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSurveyDates1715951370131 implements MigrationInterface {
    name = 'UpdateSurveyDates1715951370131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "startDate" bigint`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "endDate" bigint`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "creationDate" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "archiveDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "archiveDate" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "archiveDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "archiveDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "creationDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "creationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "endDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "startDate" TIMESTAMP`);
    }

}
