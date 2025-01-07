/*
  Warnings:

  - You are about to drop the column `user_type` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `duration` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `user_type`,
    ADD COLUMN `user_type_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `user_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_type` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_type`(`user_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `user_type_id` ON `users`(`user_type_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `user_types`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
