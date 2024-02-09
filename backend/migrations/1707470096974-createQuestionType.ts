import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionType1707470096974 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('Texte libre')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('Choix multiple')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('Choix unique')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('Case à cocher')`);
      await queryRunner.query(`INSERT INTO question_type (type) VALUES ('Date / période')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
