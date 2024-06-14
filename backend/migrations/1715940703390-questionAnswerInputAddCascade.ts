import { MigrationInterface, QueryRunner } from "typeorm";

export class QuestionAnswerInputAddCascade1715940703390 implements MigrationInterface {
    name = 'QuestionAnswerInputAddCascade1715940703390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_answer" DROP CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e"`);
        await queryRunner.query(`ALTER TABLE "question_answer" ADD CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_answer" DROP CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e"`);
        await queryRunner.query(`ALTER TABLE "question_answer" ADD CONSTRAINT "FK_1adf9ebd234bfde6fb88f0da94e" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
