/*
  Warnings:

  - You are about to drop the column `cinema_chain_id` on the `multiplexes` table. All the data in the column will be lost.
  - You are about to drop the `cinema_chains` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[account]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `multiplexes` DROP FOREIGN KEY `multiplexes_ibfk_1`;

-- AlterTable
ALTER TABLE `multiplexes` DROP COLUMN `cinema_chain_id`,
    ADD COLUMN `cineplex_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `account` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `cinema_chains`;

-- CreateTable
CREATE TABLE `cineplexes` (
    `cineplex_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cineplex_name` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`cineplex_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `cineplex_id` ON `multiplexes`(`cineplex_id`);

-- CreateIndex
CREATE UNIQUE INDEX `account` ON `users`(`account`);

-- AddForeignKey
ALTER TABLE `multiplexes` ADD CONSTRAINT `multiplexes_ibfk_1` FOREIGN KEY (`cineplex_id`) REFERENCES `cineplexes`(`cineplex_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
