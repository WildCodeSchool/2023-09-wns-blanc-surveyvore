import { MigrationInterface, QueryRunner } from "typeorm";

export class AddState1710415384524 implements MigrationInterface {
    name = 'AddState1710415384524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_356be3d7a7bdfe0fcad0c0730ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_user_email"`);
        await queryRunner.query(`ALTER TABLE "question_type" ALTER COLUMN "icon" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_type" ALTER COLUMN "icon" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")`);
        await queryRunner.query(`DROP TABLE "survey_state"`);
    }

}
