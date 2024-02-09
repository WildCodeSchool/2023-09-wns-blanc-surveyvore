import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRole1707469980964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`INSERT INTO role (name) VALUES ('USER')`);
      await queryRunner.query(`INSERT INTO role (name) VALUES ('ADMIN')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
