import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations16916700003489 implements MigrationInterface {
    name = 'Migrations16916700003489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`mobile\` varchar(255) NULL, \`photo\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`passwordResetToken\` varchar(255) NULL, \`emailChangeCode\` int NULL, \`isConfirmed\` tinyint NOT NULL DEFAULT 0, \`registrationCode\` int NULL, \`googleId\` varchar(255) NULL, \`passwordExist\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
        await queryRunner.query(`CREATE TABLE \`controllers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`systemName\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL, \`location\` varchar(255) NOT NULL, \`guard\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`tags\``);
        await queryRunner.query(`DROP TABLE \`controllers\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
