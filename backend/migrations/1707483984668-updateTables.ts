import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTables1707483984668 implements MigrationInterface {
    name = 'UpdateTables1707483984668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_829af8214d0eafc19fda27d397e"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_9c8be64ae10f12c92b67443c3db"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_ff82d9d548956e2062a07a1d3ce"`);
        await queryRunner.query(`ALTER TABLE "question_answer" DROP CONSTRAINT "FK_836d70612f731ca8441f526f3db"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_5251984933290a7d6a61d60db05"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_a80c0f2e844d10891f6f2777340"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_5f90b903312334410aa3e7eba13"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleIdId" TO "roleId"`);
        await queryRunner.query(`ALTER TABLE "survey" RENAME COLUMN "userIdId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "question_answer" RENAME COLUMN "questionIdId" TO "questionId"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "typeIdId"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "surveyIdId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "questionIdId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "answerIdId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "typeId" uuid`);
        await queryRunner.query(`ALTER TABLE "question" ADD "surveyId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "questionId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "answerId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_546db112b1fe3b00cb5f863ba19" FOREIGN KEY ("typeId") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a1188e0f702ab268e0982049e5c" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_answer" ADD CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_1940f9d25a60d83036e5f752093" FOREIGN KEY ("answerId") REFERENCES "question_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_1940f9d25a60d83036e5f752093"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6"`);
        await queryRunner.query(`ALTER TABLE "question_answer" DROP CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a1188e0f702ab268e0982049e5c"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_546db112b1fe3b00cb5f863ba19"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP CONSTRAINT "FK_5963e1aea20c3c7c2108849c08a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "answerId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP COLUMN "questionId"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "surveyId"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "typeId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "answerIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD "questionIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "question" ADD "surveyIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "question" ADD "typeIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "question_answer" RENAME COLUMN "questionId" TO "questionIdId"`);
        await queryRunner.query(`ALTER TABLE "survey" RENAME COLUMN "userId" TO "userIdId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleId" TO "roleIdId"`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_5f90b903312334410aa3e7eba13" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_a80c0f2e844d10891f6f2777340" FOREIGN KEY ("answerIdId") REFERENCES "question_answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_5251984933290a7d6a61d60db05" FOREIGN KEY ("questionIdId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_answer" ADD CONSTRAINT "FK_836d70612f731ca8441f526f3db" FOREIGN KEY ("questionIdId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_ff82d9d548956e2062a07a1d3ce" FOREIGN KEY ("surveyIdId") REFERENCES "survey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_9c8be64ae10f12c92b67443c3db" FOREIGN KEY ("typeIdId") REFERENCES "question_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey" ADD CONSTRAINT "FK_829af8214d0eafc19fda27d397e" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_88caf607c870c4a5f0cbbc16c86" FOREIGN KEY ("roleIdId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
