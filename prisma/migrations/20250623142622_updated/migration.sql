/*
  Warnings:

  - You are about to drop the column `caption` on the `comment` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `caption`,
    ADD COLUMN `content` TEXT NOT NULL;
