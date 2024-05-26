import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1716702692334 implements MigrationInterface {
    name = 'Product1716702692334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`products\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`description\` text NULL,
                \`price\` decimal(10, 2) NOT NULL,
                \`stock\` int NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`categories\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`product_categories\` (
                \`product_id\` int NOT NULL,
                \`category_id\` int NOT NULL,
                PRIMARY KEY (\`product_id\`, \`category_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_categories\`
            ADD CONSTRAINT \`FK_8748b4a0e8de6d266f2bbc877f6\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_categories\`
            ADD CONSTRAINT \`FK_9148da8f26fc248e77a387e3112\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_9148da8f26fc248e77a387e3112\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`product_categories\` DROP FOREIGN KEY \`FK_8748b4a0e8de6d266f2bbc877f6\`
        `);
        await queryRunner.query(`
            DROP TABLE \`product_categories\`
        `);
        await queryRunner.query(`
            DROP TABLE \`categories\`
        `);
        await queryRunner.query(`
            DROP TABLE \`products\`
        `);
    }

}
