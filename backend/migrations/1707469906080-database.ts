import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1707469906080 implements MigrationInterface {
    name = 'Database1707469906080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying, "lastname" character varying, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "roleIdId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "link" character varying NOT NULL, "archived" boolean NOT NULL, "private" boolean NOT NULL, "collectingUserData" boolean NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "deleteDate" TIMESTAMP, "creationDate" TIMESTAMP NOT NULL, "publicationDate" TIMESTAMP, "archiveDate" TIMESTAMP, "userIdId" uuid, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, CONSTRAINT "PK_8ee0ca6ea5ac1770d54b7ff5ca4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "defaultQuestion" boolean NOT NULL, "typeIdId" uuid, "surveyIdId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "questionIdId" uuid, CONSTRAINT "PK_c1e064f8949efd78ad3c66059ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "questionIdId" uuid, "answerIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_37b32f666e59572775b1b020fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey_invited_users_user" ("surveyId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_3bf52391e2cdd455c187f5c756d" PRIMARY KEY ("surveyId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d1c7ac26a914d2f3fc2b33d05" ON "survey_invited_users_user" ("surveyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6537982164d9398acd258213f2" ON "survey_invited_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "survey_editing_users_user" ("surveyId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_942f582fa4f1d59c7a4e7ffdcf5" PRIMARY KEY ("surveyId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ae3d326713286b453a14b9788" ON "survey_editing_users_user" ("surveyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e34c158b06be32ba52912fea83" ON "survey_editing_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86" FOREIGN KEY ("roleIdId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_829af8214d0eafc19fda27d397e" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_9c8be64ae10f12c92b67443c3db" FOREIGN KEY ("typeIdId") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_ff82d9d548956e2062a07a1d3ce" FOREIGN KEY ("surveyIdId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_answer" ADD CONSTRAINT "FK_836d70612f731ca8441f526f3db" FOREIGN KEY ("questionIdId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_5251984933290a7d6a61d60db05" FOREIGN KEY ("questionIdId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_a80c0f2e844d10891f6f2777340" FOREIGN KEY ("answerIdId") REFERENCES "question_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_5f90b903312334410aa3e7eba13" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_invited_users_user" ADD CONSTRAINT "FK_3d1c7ac26a914d2f3fc2b33d05a" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "survey_invited_users_user" ADD CONSTRAINT "FK_6537982164d9398acd258213f27" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "survey_editing_users_user" ADD CONSTRAINT "FK_8ae3d326713286b453a14b97883" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "survey_editing_users_user" ADD CONSTRAINT "FK_e34c158b06be32ba52912fea831" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_editing_users_user" DROP CONSTRAINT "FK_e34c158b06be32ba52912fea831"`);
        await queryRunner.query(`ALTER TABLE "survey_editing_users_user" DROP CONSTRAINT "FK_8ae3d326713286b453a14b97883"`);
        await queryRunner.query(`ALTER TABLE "survey_invited_users_user" DROP CONSTRAINT "FK_6537982164d9398acd258213f27"`);
        await queryRunner.query(`ALTER TABLE "survey_invited_users_user" DROP CONSTRAINT "FK_3d1c7ac26a914d2f3fc2b33d05a"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_5f90b903312334410aa3e7eba13"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_a80c0f2e844d10891f6f2777340"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_5251984933290a7d6a61d60db05"`);
        await queryRunner.query(`ALTER TABLE "question_answer" DROP CONSTRAINT "FK_836d70612f731ca8441f526f3db"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_ff82d9d548956e2062a07a1d3ce"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_9c8be64ae10f12c92b67443c3db"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_829af8214d0eafc19fda27d397e"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e34c158b06be32ba52912fea83"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ae3d326713286b453a14b9788"`);
        await queryRunner.query(`DROP TABLE "survey_editing_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6537982164d9398acd258213f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d1c7ac26a914d2f3fc2b33d05"`);
        await queryRunner.query(`DROP TABLE "survey_invited_users_user"`);
        await queryRunner.query(`DROP TABLE "user_answer"`);
        await queryRunner.query(`DROP TABLE "question_answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "question_type"`);
        await queryRunner.query(`DROP TABLE "survey"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
