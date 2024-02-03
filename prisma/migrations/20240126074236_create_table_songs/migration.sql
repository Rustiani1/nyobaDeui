-- CreateTable
CREATE TABLE `songs` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `artist` VARCHAR(191) NOT NULL,
    `album` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
