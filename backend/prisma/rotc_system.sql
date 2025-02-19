-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 06, 2025 at 08:26 AM
-- Server version: 8.4.3
-- PHP Version: 8.2.4

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
  `achievement_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `achievement_type` enum('promotion','award','recognition') NOT NULL,
  `achievement_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `achievement`
--

INSERT INTO `achievement` (`achievement_id`, `cadets_id`, `achievement_type`, `achievement_date`, `description`) VALUES
(1, 1, 'award', '2024-12-31 01:55:16', 'Best Cadet Award'),
(2, 2, 'promotion', '2024-12-31 01:55:16', 'Promoted to Officer');

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('present','absent','late') DEFAULT 'present',
  `id_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `cadets_id`, `date_time`, `status`, `id_number`) VALUES
(1, 1, '2024-12-31 01:55:16', 'present', 'C12345'),
(2, 2, '2024-12-31 01:55:16', 'late', 'C67890');

-- --------------------------------------------------------

--
-- Table structure for table `battalion_group`
--

CREATE TABLE `battalion_group` (
  `battalion_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `battalion_name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `commander` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `battalion_group`
--

INSERT INTO `battalion_group` (`battalion_id`, `cadets_id`, `battalion_name`, `location`, `commander`) VALUES
(1, 1, 'Alpha Battalion', 'Main Campus', 'John Doe'),
(2, 2, 'Bravo Battalion', 'South Campus', 'Jane Smith');

-- --------------------------------------------------------

--
-- Table structure for table `cadets_information`
--

CREATE TABLE `cadets_information` (
  `cadets_id` int NOT NULL,
  `user_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `blood_type` enum('a','b','ab','o') NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(15) DEFAULT NULL,
  `enrollment_status` enum('active','inactive') DEFAULT 'active',
  `cadet_rank` varchar(50) DEFAULT 'cadet',
  `enrollment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `battalion_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cadets_information`
--

INSERT INTO `cadets_information` (`cadets_id`, `user_id`, `first_name`, `last_name`, `date_of_birth`, `gender`, `blood_type`, `address`, `contact_number`, `enrollment_status`, `cadet_rank`, `enrollment_date`, `battalion_id`) VALUES
(1, 1, 'John', 'Cadet', '2000-05-15', 'male', 'o', '123 Main St', '09171234567', 'active', 'cadet', '2024-12-31 01:55:16', 1),
(2, 2, 'Alice', 'Officer', '1995-08-20', 'female', 'a', '456 South St', '09181234567', 'active', 'officer', '2024-12-31 01:55:16', 2);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollment_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `semester` varchar(20) NOT NULL,
  `enrollment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `graduation_period` varchar(20) DEFAULT NULL,
  `status` enum('enrolled','graduate','dropped') DEFAULT 'enrolled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`enrollment_id`, `cadets_id`, `course_name`, `semester`, `enrollment_date`, `graduation_period`, `status`) VALUES
(1, 1, 'Military Science', '1st Semester', '2024-12-31 01:55:16', '2025', 'enrolled');

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

CREATE TABLE `grade` (
  `grade_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `subject` varchar(100) NOT NULL,
  `grade` decimal(5,2) NOT NULL,
  `semester` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`grade_id`, `cadets_id`, `subject`, `grade`, `semester`) VALUES
(1, 1, 'Military Science 101', 89.50, '1st Semester'),
(2, 1, 'Military Science 102', 92.00, '2nd Semester');

-- --------------------------------------------------------

--
-- Table structure for table `rotc_officer`
--

CREATE TABLE `rotc_officer` (
  `officer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `cadet_rank` varchar(50) NOT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `battalion_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rotc_officer`
--

INSERT INTO `rotc_officer` (`officer_id`, `user_id`, `cadet_rank`, `unit`, `battalion_id`) VALUES
(1, 2, 'Captain', 'Alpha Unit', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `event_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `event_time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `event_type` enum('training','drill','exercise') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `cadets_id`, `event_date`, `event_time`, `location`, `event_type`) VALUES
(1, 1, '2024-12-31 01:55:16', '09:00:00', 'Drill Ground', 'training'),
(2, 1, '2024-12-31 01:55:16', '13:00:00', 'Lecture Hall', 'exercise');

-- --------------------------------------------------------

--
-- Table structure for table `scholarship`
--

CREATE TABLE `scholarship` (
  `scholarship_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `scholarship_name` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `award_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` timestamp NULL DEFAULT NULL,
  `status` enum('active','expired') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `scholarship`
--

INSERT INTO `scholarship` (`scholarship_id`, `cadets_id`, `scholarship_name`, `amount`, `award_date`, `expiry_date`, `status`) VALUES
(1, 1, 'Leadership Scholarship', 10000.00, '2024-12-31 01:55:16', '2025-12-31 23:59:59', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('cadet','rotc_coordinator','rotc_officer') NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `email`, `phone_number`) VALUES
(1, 'cadet_user', 'password123', 'cadet', 'cadet@example.com', '09171234567'),
(2, 'officer_user', 'password123', 'rotc_officer', 'officer@example.com', '09181234567'),
(3, 'coordinator_user', 'password123', 'rotc_coordinator', 'coordinator@example.com', '09191234567');

-- --------------------------------------------------------

--
-- Table structure for table `volunteer`
--

CREATE TABLE `volunteer` (
  `volunteer_id` int NOT NULL,
  `cadets_id` int NOT NULL,
  `event` varchar(100) NOT NULL,
  `volunteer_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hours_contributed` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `volunteer`
--

INSERT INTO `volunteer` (`volunteer_id`, `cadets_id`, `event`, `volunteer_date`, `hours_contributed`) VALUES
(1, 1, 'Community Service', '2024-12-31 01:55:16', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievement`
--
ALTER TABLE `achievement`
  ADD PRIMARY KEY (`achievement_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`),
  ADD KEY `cadets_id` (`cadets_id`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `battalion_id` (`battalion_id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`grade_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- Indexes for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  ADD PRIMARY KEY (`officer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `battalion_id` (`battalion_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- Indexes for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD PRIMARY KEY (`scholarship_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD PRIMARY KEY (`volunteer_id`),
  ADD KEY `cadets_id` (`cadets_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievement`
--
ALTER TABLE `achievement`
  MODIFY `achievement_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `battalion_group`
--
ALTER TABLE `battalion_group`
  MODIFY `battalion_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cadets_information`
--
ALTER TABLE `cadets_information`
  MODIFY `cadets_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `grade_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  MODIFY `officer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `scholarship`
--
ALTER TABLE `scholarship`
  MODIFY `scholarship_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `volunteer`
--
ALTER TABLE `volunteer`
  MODIFY `volunteer_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievement`
--
ALTER TABLE `achievement`
  ADD CONSTRAINT `achievement_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `cadets_information`
--
ALTER TABLE `cadets_information`
  ADD CONSTRAINT `cadets_information_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cadets_information_ibfk_2` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group` (`battalion_id`);

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `grade`
--
ALTER TABLE `grade`
  ADD CONSTRAINT `grade_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `rotc_officer`
--
ALTER TABLE `rotc_officer`
  ADD CONSTRAINT `rotc_officer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `rotc_officer_ibfk_2` FOREIGN KEY (`battalion_id`) REFERENCES `battalion_group` (`battalion_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `scholarship`
--
ALTER TABLE `scholarship`
  ADD CONSTRAINT `scholarship_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);

--
-- Constraints for table `volunteer`
--
ALTER TABLE `volunteer`
  ADD CONSTRAINT `volunteer_ibfk_1` FOREIGN KEY (`cadets_id`) REFERENCES `cadets_information` (`cadets_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
