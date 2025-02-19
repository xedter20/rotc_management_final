-- CreateTable
CREATE TABLE `applications` (
    `application_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `student_no` VARCHAR(191) NOT NULL,
    `ms` VARCHAR(191) NOT NULL,
    `application_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `region` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `barangay` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `date_of_birth` VARCHAR(191) NOT NULL,
    `place_of_birth` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,
    `complexion` VARCHAR(191) NOT NULL,
    `blood_type` VARCHAR(191) NOT NULL,
    `father` VARCHAR(191) NOT NULL,
    `father_occupation` VARCHAR(191) NOT NULL,
    `mother` VARCHAR(191) NOT NULL,
    `mother_occupation` VARCHAR(191) NOT NULL,
    `emergency_contact` VARCHAR(191) NOT NULL,
    `emergency_relationship` VARCHAR(191) NOT NULL,
    `emergency_address` VARCHAR(191) NOT NULL,
    `emergency_phone` VARCHAR(191) NOT NULL,
    `military_science` VARCHAR(191) NULL,
    `willing_to_advance` BOOLEAN NOT NULL,
    `profile_picture` VARCHAR(191) NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`application_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
