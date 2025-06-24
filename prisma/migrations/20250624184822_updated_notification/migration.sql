/*
  Warnings:

  - You are about to drop the column `content` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notification` DROP COLUMN `content`,
    ADD COLUMN `message` TEXT NULL;
