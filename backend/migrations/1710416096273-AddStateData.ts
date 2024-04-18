import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStateData1710416096273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {   
    await queryRunner.query(`INSERT INTO survey_state (state, color) VALUES
    ('in-progress', 'primary'),
    ('draft', 'amber'),
    ('published', 'emerald'),
    ('closed', 'rose'),
    ('archived', 'grey');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
