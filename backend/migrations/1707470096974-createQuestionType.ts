import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionType1707470096974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('text')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('checkboxes')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('radio')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('checkbox')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('date')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
