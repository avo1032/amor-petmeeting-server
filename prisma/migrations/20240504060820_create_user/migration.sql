/*
  Warnings:

  - You are about to drop the column `ageInMonths` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `animalType` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `detailedRegion` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `mainImage` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `free_adoption_posts` table. All the data in the column will be lost.
  - You are about to drop the column `freeAdoptionPostId` on the `sub_images` table. All the data in the column will be lost.
  - Added the required column `age_in_months` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animal_type` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailed_region` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_image` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `free_adoption_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `free_adoption_post_id` to the `sub_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `sub_images` DROP FOREIGN KEY `sub_images_freeAdoptionPostId_fkey`;

-- AlterTable
ALTER TABLE `free_adoption_posts` DROP COLUMN `ageInMonths`,
    DROP COLUMN `animalType`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `detailedRegion`,
    DROP COLUMN `mainImage`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `age_in_months` INTEGER NOT NULL,
    ADD COLUMN `animal_type` ENUM('DOG', 'CAT') NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `detailed_region` VARCHAR(191) NOT NULL,
    ADD COLUMN `main_image` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `sub_images` DROP COLUMN `freeAdoptionPostId`,
    ADD COLUMN `free_adoption_post_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `nick_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `profile_image` VARCHAR(191) NULL,
    `last_activated_at` DATETIME(3) NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `status` ENUM('ACTIVE', 'BANNED') NOT NULL DEFAULT 'ACTIVE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_uuid_key`(`uuid`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `free_adoption_posts` ADD CONSTRAINT `free_adoption_posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_images` ADD CONSTRAINT `sub_images_free_adoption_post_id_fkey` FOREIGN KEY (`free_adoption_post_id`) REFERENCES `free_adoption_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
