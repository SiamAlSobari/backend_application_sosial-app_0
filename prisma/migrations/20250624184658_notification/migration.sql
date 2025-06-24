-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('follow_request', 'follow_accept', 'follow_reject', 'post_like', 'post_comment', 'post_comment_reply', 'like') NOT NULL,
    `content` TEXT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `receiver_id` VARCHAR(191) NOT NULL,
    `sender_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Notification_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
