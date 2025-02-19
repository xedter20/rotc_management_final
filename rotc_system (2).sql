-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2025 at 08:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rotc_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievement`
--

CREATE TABLE `achievement` (
  `achievement_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `achievement_type` enum('promotion','award','recognition') NOT NULL,
  `achievement_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime(3) NOT NULL,
  `type` varchar(191) NOT NULL,
  `maxScore` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `priority` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `student_no` varchar(191) NOT NULL,
  `ms` varchar(191) NOT NULL,
  `application_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `last_name` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `middle_name` varchar(191) DEFAULT NULL,
  `region` varchar(191) NOT NULL,
  `province` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `barangay` varchar(191) NOT NULL,
  `phone_number` varchar(191) NOT NULL,
  `course` varchar(191) NOT NULL,
  `school` varchar(191) NOT NULL,
  `religion` varchar(191) NOT NULL,
  `date_of_birth` varchar(191) NOT NULL,
  `place_of_birth` varchar(191) NOT NULL,
  `height` varchar(191) NOT NULL,
  `weight` varchar(191) NOT NULL,
  `complexion` varchar(191) NOT NULL,
  `blood_type` varchar(191) NOT NULL,
  `father` varchar(191) NOT NULL,
  `father_occupation` varchar(191) NOT NULL,
  `mother` varchar(191) NOT NULL,
  `mother_occupation` varchar(191) NOT NULL,
  `emergency_contact` varchar(191) NOT NULL,
  `emergency_relationship` varchar(191) NOT NULL,
  `emergency_address` varchar(191) NOT NULL,
  `emergency_phone` varchar(191) NOT NULL,
  `military_science` varchar(191) DEFAULT NULL,
  `willing_to_advance` tinyint(1) NOT NULL,
  `profile_picture` varchar(191) DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`application_id`, `user_id`, `student_no`, `ms`, `application_date`, `last_name`, `first_name`, `middle_name`, `region`, `province`, `city`, `barangay`, `phone_number`, `course`, `school`, `religion`, `date_of_birth`, `place_of_birth`, `height`, `weight`, `complexion`, `blood_type`, `father`, `father_occupation`, `mother`, `mother_occupation`, `emergency_contact`, `emergency_relationship`, `emergency_address`, `emergency_phone`, `military_science`, `willing_to_advance`, `profile_picture`, `status`, `created_at`, `updated_at`) VALUES
(5, 1, '123', '12', '2025-02-11 02:56:47.230', 'MIRANDA', 'DEXTER', 'Benusa', '05', '0505', '050506', '050506005', '09275478620', 'comsci', 'STI', 'JW', '2025-02-11', 'pawa', '153', '70', 'n', 'n', 'dan', 'carpenter', 'terry miranda', 'hoy', '09275478620', 'mother', 'Pawa, Legazpi City', '09275478620', '', 1, 'profile-pictures/profilePicture-1739242607216-2869727.png', 'approved', '2025-02-11 02:56:47.230', '2025-02-19 04:20:14.656');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `date_time` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `status` enum('present','absent','late') NOT NULL DEFAULT 'present',
  `id_number` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `battalion_group`
--

CREATE TABLE `battalion_group` (
  `battalion_id` int(11) NOT NULL,
  `battalion_name` varchar(191) NOT NULL,
  `location` varchar(191) DEFAULT NULL,
  `commander` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `battalion_group`
--

INSERT INTO `battalion_group` (`battalion_id`, `battalion_name`, `location`, `commander`) VALUES
(1, 'First Battalion', 'Main Campus', 'Col. James Smith');

-- --------------------------------------------------------

--
-- Table structure for table `cadets_information`
--

CREATE TABLE `cadets_information` (
  `cadets_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `date_of_birth` datetime(3) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `blood_type` enum('a','b','ab','o') NOT NULL,
  `address` varchar(191) DEFAULT NULL,
  `contact_number` varchar(191) DEFAULT NULL,
  `enrollment_status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `cadet_rank` varchar(191) NOT NULL DEFAULT 'cadet',
  `enrollment_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `battalion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cadets_information`
--

INSERT INTO `cadets_information` (`cadets_id`, `user_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `blood_type`, `address`, `contact_number`, `enrollment_status`, `cadet_rank`, `enrollment_date`, `battalion_id`) VALUES
(1, 3, 'Jane', 'Coordinator', '1985-01-01 00:00:00.000', 'female', 'a', 'Manila', '09987654321', 'active', 'Coordinator', '2025-02-11 03:25:13.080', 1),
(2, 4, 'Sample', 'Cadet', '2000-01-01 00:00:00.000', 'male', 'b', 'Manila', '09123456788', 'active', 'Cadet', '2025-02-11 03:25:13.160', 1);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollment_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `course_name` varchar(191) NOT NULL,
  `semester` varchar(191) NOT NULL,
  `enrollment_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `graduation_period` varchar(191) DEFAULT NULL,
  `status` enum('enrolled','graduate','dropped') NOT NULL DEFAULT 'enrolled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `grade_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `subject` varchar(191) NOT NULL,
  `grade` decimal(5,2) NOT NULL,
  `semester` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `performances`
--

CREATE TABLE `performances` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `activityId` int(11) NOT NULL,
  `score` double NOT NULL,
  `remarks` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rotc_officer`
--

CREATE TABLE `rotc_officer` (
  `officer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `cadet_rank` varchar(191) NOT NULL,
  `unit` varchar(191) DEFAULT NULL,
  `battalion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rotc_officer`
--

INSERT INTO `rotc_officer` (`officer_id`, `user_id`, `cadet_rank`, `unit`, `battalion_id`) VALUES
(1, 2, 'Captain', 'Alpha Company', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `event_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `event_time` datetime(3) NOT NULL,
  `location` varchar(191) NOT NULL,
  `event_type` enum('training','drill','exercise') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `scholarship_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `scholarship_name` varchar(191) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `award_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiry_date` datetime(3) DEFAULT NULL,
  `status` enum('active','expired') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `firstName` varchar(191) NOT NULL,
  `middleName` varchar(191) DEFAULT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `dateOfBirth` varchar(191) NOT NULL,
  `gender` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `province` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `barangay` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` enum('cadet','rotc_officer','rotc_coordinator') NOT NULL DEFAULT 'cadet',
  `course` varchar(191) DEFAULT NULL,
  `phone_number` varchar(191) DEFAULT NULL,
  `platoon` varchar(191) DEFAULT NULL,
  `section` varchar(191) DEFAULT NULL,
  `studentNumber` varchar(191) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `yearLevel` varchar(191) DEFAULT NULL,
  `verificationToken` varchar(191) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`firstName`, `middleName`, `lastName`, `email`, `dateOfBirth`, `gender`, `region`, `province`, `city`, `barangay`, `password`, `createdAt`, `updatedAt`, `role`, `course`, `phone_number`, `platoon`, `section`, `studentNumber`, `user_id`, `username`, `yearLevel`, `verificationToken`, `isVerified`) VALUES
('DEXTER', 'Benusa', 'MIRANDA', 'dextermiranda441@gmail.com', '2025-02-11', 'Male', '05', '0505', '050506', '050506008', '$2a$10$HxG9sI7gCwILnSWM7lT1h.TxpWbJwdrs0mFpEZGgj6vxzncTLWtk.', '2025-02-11 01:46:26.491', '2025-02-11 01:46:26.491', 'cadet', NULL, '09275478620', NULL, NULL, NULL, 1, 'dextermiranda441@gmail.com', NULL, NULL, 0),
('John', NULL, 'Officer', 'rotc.officer@example.com', '1990-01-01', 'Male', 'NCR', 'Metro Manila', 'Manila', 'Sampaloc', '$2a$10$HxG9sI7gCwILnSWM7lT1h.TxpWbJwdrs0mFpEZGgj6vxzncTLWtk.', '2025-02-11 03:25:12.977', '2025-02-11 03:25:12.977', 'rotc_officer', 'Military Science', '09123456789', 'Alpha', 'A', NULL, 2, 'rotc.officer@example.com', '4th', NULL, 0),
('Jane', NULL, 'Coordinator', 'rotc.coordinator@example.com', '1985-01-01', 'Female', 'NCR', 'Metro Manila', 'Manila', 'Sampaloc', '$2a$10$.tFodeJ/maf.cPN2RPVtHeTO675Qkn65Kpj1BOPlewsJv5d5LEiF6', '2025-02-11 03:25:13.080', '2025-02-11 03:25:13.080', 'rotc_coordinator', 'Military Science', '09987654321', 'Alpha', 'A', NULL, 3, 'rotc.coordinator@example.com', '4th', NULL, 0),
('Sample', NULL, 'Cadet', 'cadet@example.com', '2000-01-01', 'Male', 'NCR', 'Metro Manila', 'Manila', 'Sampaloc', '$2a$10$Vr8N3I.loH4FE1Z78XfB7.ygXdpI0k6UZfSDXDHVFu80do0CZ0eUe', '2025-02-11 03:25:13.160', '2025-02-11 03:25:13.160', 'cadet', 'Computer Science', '09123456788', 'Bravo', 'B', NULL, 4, 'cadet@example.com', '2nd', NULL, 0),
('Dexter', 'bequillo', 'Miranda', 'mdexter958@gmail.com', '2025-02-19', 'Male', '11', '1124', '112412', '112412010', '$2a$10$HxG9sI7gCwILnSWM7lT1h.TxpWbJwdrs0mFpEZGgj6vxzncTLWtk.', '2025-02-19 04:08:21.573', '2025-02-19 05:03:36.311', 'cadet', NULL, '09275478620', NULL, NULL, NULL, 9, 'mdexter958@gmail.com', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `violations`
--

CREATE TABLE `violations` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `description` text NOT NULL,
  `date` datetime(3) NOT NULL,
  `penalty` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE `volunteer` (
  `volunteer_id` int(11) NOT NULL,
  `cadets_id` int(11) NOT NULL,
  `event` varchar(191) NOT NULL,
  `volunteer_date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `hours_contributed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('1b9a86f9-1729-4a7f-9b6b-893f5ff9fdf8', '8ddacfce236d10629a2a338c08c51451f66b9581f947642685507033e26c74e9', '2025-02-11 01:44:46.902', '20250209234723_init', NULL, NULL, '2025-02-11 01:44:46.839', 1),
('258f8931-de06-48a7-bf4b-c978bf9ea043', '9f7f857ba44c5949034f3bed2299e0350b13c1f6fcd8bfa7cf500a7499f05201', '2025-02-11 01:44:47.353', '20250210231458_remove_product_models', NULL, NULL, '2025-02-11 01:44:47.339', 1),
('3354015a-2305-4499-8f46-c989b8370a75', 'fa01ddd58f877c44ce412560f2f6200650a68f444ef85cb0961671f1e55da955', '2025-02-11 01:44:46.941', '20250210003111_', NULL, NULL, '2025-02-11 01:44:46.903', 1),
('39eff098-a47d-4b35-a8e1-245c1ad99cd0', 'a4c4cca379f0e07d993af69646846a015002d8baae6f99663416d7121dddd4b7', '2025-02-11 01:44:46.962', '20250210044719_init_user_schema', NULL, NULL, '2025-02-11 01:44:46.942', 1),
('8c65576d-9015-477c-a159-9939135b1be4', 'efef15dad0bca11575bf45690ee3f00a958ea3155d458efc6b0e6db727cc9933', '2025-02-11 01:44:46.968', '20250210053706_add_role_column', NULL, NULL, '2025-02-11 01:44:46.963', 1),
('b8a843ec-1716-461c-b334-b6d19e6306bf', 'b4a9206ce93b7ae7f20d51e85a91ee05a26a68383ebbb0e375e378c6f3ff5bf6', '2025-02-19 03:54:27.984', '20250219035427_add_verification_token', NULL, NULL, '2025-02-19 03:54:27.979', 1),
('c007a2fb-ba0d-4e0d-94c4-1e3bb341fadb', '35395c62e0d4ae45a5a1bee5f4c71d0f54eeddfb0ef784d1e9027251ca30e885', '2025-02-19 04:07:13.478', '20250219040713_add_is_verified', NULL, NULL, '2025-02-19 04:07:13.474', 1),
('c2efdea6-5d15-406b-9a93-5e8137e62fe8', 'b5331cac2802aff7e1dfba1e40168211cfed446a3bc278b85ca43b86c3a38dca', '2025-02-11 01:45:05.580', '20250211014448_add_application_model', NULL, NULL, '2025-02-11 01:45:05.549', 1),
('c84bb1f3-8323-4e3d-9a6b-f541b5dc4733', '9a9d4d4f8dcb470af42377e0a54bf5983952e1c4018e0aa223a9404b6acb0540', '2025-02-11 01:44:47.339', '20250210231156_validate_relations', NULL, NULL, '2025-02-11 01:44:46.969', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`achievement_id`),
  ADD KEY `achievement_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`application_id`),
  ADD KEY `applications_user_id_fkey` (`user_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `attendance_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `battalion_group`
--
ALTER TABLE `battalion_group`
  ADD PRIMARY KEY (`battalion_id`);

--
-- Indexes for table `cadets_information`
--
ALTER TABLE `cadets_information`
  ADD PRIMARY KEY (`cadets_id`),
  ADD UNIQUE KEY `cadets_information_user_id_key` (`user_id`),
  ADD KEY `cadets_information_battalion_id_fkey` (`battalion_id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `enrollment_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `grade_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `performances_userId_fkey` (`userId`),
  ADD KEY `performances_activityId_fkey` (`activityId`);

--
-- Indexes for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  ADD PRIMARY KEY (`officer_id`),
  ADD UNIQUE KEY `rotc_officer_user_id_key` (`user_id`),
  ADD KEY `rotc_officer_battalion_id_fkey` (`battalion_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `schedule_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`scholarship_id`),
  ADD KEY `scholarship_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD UNIQUE KEY `users_studentNumber_key` (`studentNumber`);

--
-- Indexes for table `violations`
--
ALTER TABLE `violations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `violations_userId_fkey` (`userId`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`volunteer_id`),
  ADD KEY `volunteer_cadets_id_fkey` (`cadets_id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievement`
--
ALTER TABLE `achievement`
  MODIFY `achievement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `battalion_group`
--
ALTER TABLE `battalion_group`
  MODIFY `battalion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cadets_information`
--
ALTER TABLE `cadets_information`
  MODIFY `cadets_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `performances`
--
ALTER TABLE `performances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  MODIFY `officer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `scholarship_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `violations`
--
ALTER TABLE `violations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `volunteer`
--
ALTER TABLE `volunteer`
  MODIFY `volunteer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievement`
--
ALTER TABLE `achievement`
  ADD CONSTRAINT `achievement_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `cadets_information`
--
ALTER TABLE `cadets_information`
  ADD CONSTRAINT `cadets_information_battalion_id_fkey` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group` (`battalion_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cadets_information_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `performances`
--
ALTER TABLE `performances`
  ADD CONSTRAINT `performances_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `activities` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `performances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  ADD CONSTRAINT `rotc_officer_battalion_id_fkey` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group` (`battalion_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `rotc_officer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD CONSTRAINT `scholarship_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;

--
-- Constraints for table `violations`
--
ALTER TABLE `violations`
  ADD CONSTRAINT `violations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE;

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `volunteer_cadets_id_fkey` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
