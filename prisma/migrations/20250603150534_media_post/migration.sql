-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `caption` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Post_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Media` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `type` ENUM('VIDEO', 'IMAGE') NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Media_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
