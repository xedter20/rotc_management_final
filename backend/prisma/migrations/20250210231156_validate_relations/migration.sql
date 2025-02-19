/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - A unique constraint covering the columns `[studentNumber]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `course` VARCHAR(191) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL,
    ADD COLUMN `platoon` VARCHAR(191) NULL,
    ADD COLUMN `section` VARCHAR(191) NULL,
    ADD COLUMN `studentNumber` VARCHAR(191) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD COLUMN `yearLevel` VARCHAR(191) NULL,
    MODIFY `role` ENUM('cadet', 'rotc_officer', 'rotc_coordinator') NOT NULL DEFAULT 'cadet',
    ADD PRIMARY KEY (`user_id`);

-- CreateTable
CREATE TABLE `cadets_information` (
    `cadets_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `blood_type` ENUM('a', 'b', 'ab', 'o') NOT NULL,
    `address` VARCHAR(191) NULL,
    `contact_number` VARCHAR(191) NULL,
    `enrollment_status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `cadet_rank` VARCHAR(191) NOT NULL DEFAULT 'cadet',
    `enrollment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `battalion_id` INTEGER NULL,

    UNIQUE INDEX `cadets_information_user_id_key`(`user_id`),
    PRIMARY KEY (`cadets_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievement` (
    `achievement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `achievement_type` ENUM('promotion', 'award', 'recognition') NOT NULL,
    `achievement_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NOT NULL,

    PRIMARY KEY (`achievement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('present', 'absent', 'late') NOT NULL DEFAULT 'present',
    `id_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `battalion_group` (
    `battalion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `battalion_name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `commander` VARCHAR(191) NULL,

    PRIMARY KEY (`battalion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rotc_officer` (
    `officer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `cadet_rank` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NULL,
    `battalion_id` INTEGER NULL,

    UNIQUE INDEX `rotc_officer_user_id_key`(`user_id`),
    PRIMARY KEY (`officer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `enrollment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `course_name` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `enrollment_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `graduation_period` VARCHAR(191) NULL,
    `status` ENUM('enrolled', 'graduate', 'dropped') NOT NULL DEFAULT 'enrolled',

    PRIMARY KEY (`enrollment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grade` (
    `grade_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `grade` DECIMAL(5, 2) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`grade_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `event_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `event_time` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `event_type` ENUM('training', 'drill', 'exercise') NOT NULL,

    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scholarship` (
    `scholarship_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `scholarship_name` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `award_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiry_date` DATETIME(3) NULL,
    `status` ENUM('active', 'expired') NOT NULL,

    PRIMARY KEY (`scholarship_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `volunteer` (
    `volunteer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cadets_id` INTEGER NOT NULL,
    `event` VARCHAR(191) NOT NULL,
    `volunteer_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hours_contributed` INTEGER NOT NULL,

    PRIMARY KEY (`volunteer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `performances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `activityId` INTEGER NOT NULL,
    `score` DOUBLE NOT NULL,
    `remarks` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `activities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `date` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `maxScore` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `violations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `penalty` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `priority` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `users_studentNumber_key` ON `users`(`studentNumber`);

-- AddForeignKey
ALTER TABLE `cadets_information` ADD CONSTRAINT `cadets_information_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cadets_information` ADD CONSTRAINT `cadets_information_battalion_id_fkey` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group`(`battalion_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `achievement` ADD CONSTRAINT `achievement_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `attendance_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotc_officer` ADD CONSTRAINT `rotc_officer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotc_officer` ADD CONSTRAINT `rotc_officer_battalion_id_fkey` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group`(`battalion_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `enrollment_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grade` ADD CONSTRAINT `grade_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scholarship` ADD CONSTRAINT `scholarship_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volunteer` ADD CONSTRAINT `volunteer_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information`(`cadets_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performances` ADD CONSTRAINT `performances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `performances` ADD CONSTRAINT `performances_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `violations` ADD CONSTRAINT `violations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
