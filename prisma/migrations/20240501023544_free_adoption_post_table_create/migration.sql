-- CreateTable
CREATE TABLE `free_adoption_posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `detailedRegion` VARCHAR(191) NOT NULL,
    `animalType` ENUM('DOG', 'CAT') NOT NULL,
    `breed` VARCHAR(191) NOT NULL,
    `sex` ENUM('MALE', 'FEMALE', 'UNKNOWN') NOT NULL,
    `ageInMonths` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `mainImage` VARCHAR(191) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `free_adoption_posts_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `freeAdoptionPostId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sub_images` ADD CONSTRAINT `sub_images_freeAdoptionPostId_fkey` FOREIGN KEY (`freeAdoptionPostId`) REFERENCES `free_adoption_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
