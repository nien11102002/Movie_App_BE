-- CreateTable
CREATE TABLE `banners` (
    `banner_id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NULL,
    `image` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`banner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cinema_chains` (
    `cinema_chain_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cinema_chain_name` VARCHAR(255) NULL,
    `logo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`cinema_chain_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cinemas` (
    `cinema_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cinema_name` VARCHAR(255) NULL,
    `multiplex_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `multiplex_id`(`multiplex_id`),
    PRIMARY KEY (`cinema_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `movie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_name` VARCHAR(255) NULL,
    `trailer` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `premiere_day` TIMESTAMP(0) NULL,
    `rating` INTEGER NULL,
    `hot` BOOLEAN NULL,
    `is_showing` BOOLEAN NULL,
    `is_coming` BOOLEAN NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `multiplexes` (
    `multiplex_id` INTEGER NOT NULL AUTO_INCREMENT,
    `multiplex_name` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `cinema_chain_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `cinema_chain_id`(`cinema_chain_id`),
    PRIMARY KEY (`multiplex_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seats` (
    `seat_id` INTEGER NOT NULL AUTO_INCREMENT,
    `seat_name` VARCHAR(255) NULL,
    `seat_type` VARCHAR(255) NULL,
    `cinema_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `cinema_id`(`cinema_id`),
    PRIMARY KEY (`seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `showtimes` (
    `showtime_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cinema_id` INTEGER NULL,
    `movie_id` INTEGER NULL,
    `showtime` TIMESTAMP(0) NULL,
    `ticket_price` INTEGER NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `cinema_id`(`cinema_id`),
    INDEX `movie_id`(`movie_id`),
    PRIMARY KEY (`showtime_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_bookings` (
    `account_id` INTEGER NOT NULL,
    `showtime_id` INTEGER NOT NULL,
    `seat_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `seat_id`(`seat_id`),
    INDEX `showtime_id`(`showtime_id`),
    PRIMARY KEY (`account_id`, `showtime_id`, `seat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phone_number` VARCHAR(15) NULL,
    `password` VARCHAR(255) NULL,
    `user_type` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `banners` ADD CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`movie_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `cinemas` ADD CONSTRAINT `cinemas_ibfk_1` FOREIGN KEY (`multiplex_id`) REFERENCES `multiplexes`(`multiplex_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `multiplexes` ADD CONSTRAINT `multiplexes_ibfk_1` FOREIGN KEY (`cinema_chain_id`) REFERENCES `cinema_chains`(`cinema_chain_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `seats` ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas`(`cinema_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `showtimes` ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movies`(`movie_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `showtimes` ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`cinema_id`) REFERENCES `cinemas`(`cinema_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ticket_bookings` ADD CONSTRAINT `ticket_bookings_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `users`(`account_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ticket_bookings` ADD CONSTRAINT `ticket_bookings_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes`(`showtime_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ticket_bookings` ADD CONSTRAINT `ticket_bookings_ibfk_3` FOREIGN KEY (`seat_id`) REFERENCES `seats`(`seat_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
