import { MigrationInterface, QueryRunner } from "typeorm";

export class ModidyAnswerEntity1718356399216 implements MigrationInterface {
    name = 'ModidyAnswerEntity1718356399216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_answer" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

}
