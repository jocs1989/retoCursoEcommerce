import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ecomerce1709709387781 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "name" TO "title"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" RENAME COLUMN "title" TO "name"`,
    ); // reverts things made in "up" method
  }
}
