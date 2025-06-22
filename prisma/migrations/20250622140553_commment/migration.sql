-- DropForeignKey
ALTER TABLE `followrequest` DROP FOREIGN KEY `FollowRequest_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `followrequest` DROP FOREIGN KEY `FollowRequest_sender_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_user_id_fkey`;

-- DropIndex
DROP INDEX `FollowRequest_receiver_id_fkey` ON `followrequest`;

-- DropIndex
DROP INDEX `Like_post_id_fkey` ON `like`;

-- DropIndex
DROP INDEX `Media_post_id_fkey` ON `media`;

-- DropIndex
DROP INDEX `Post_user_id_fkey` ON `post`;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `caption` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `parent_id` VARCHAR(191) NULL,
    `post_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Comment_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FollowRequest` ADD CONSTRAINT `FollowRequest_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FollowRequest` ADD CONSTRAINT `FollowRequest_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
