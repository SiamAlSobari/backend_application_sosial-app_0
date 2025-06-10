-- AlterTable
ALTER TABLE `profile` ADD COLUMN `alamat` VARCHAR(191) NULL,
    ADD COLUMN `cover_image` VARCHAR(191) NOT NULL DEFAULT 'https://img.freepik.com/free-photo/smooth-black-paper-textured-background_53876-160610.jpg?semt=ais_hybrid&w=740',
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `is_public` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `pekerjaan` VARCHAR(191) NULL,
    ADD COLUMN `pendidikan` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL;
