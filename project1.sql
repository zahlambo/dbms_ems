-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 07:05 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project1`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `comment` longtext NOT NULL,
  `time` datetime NOT NULL,
  `employeesid` int(11) NOT NULL,
  `postid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `daily_work`
--

CREATE TABLE `daily_work` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `time` datetime NOT NULL,
  `deadline` datetime NOT NULL,
  `submission_time` datetime DEFAULT NULL,
  `project_point` int(11) NOT NULL,
  `employeesid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `daily_work`
--

INSERT INTO `daily_work` (`id`, `title`, `description`, `time`, `deadline`, `submission_time`, `project_point`, `employeesid`) VALUES
(27, 'work1', 'compleate work1', '2021-06-19 09:33:24', '2021-06-26 09:33:00', NULL, 7, 9),
(28, 'work2', 'complete work 2', '2021-06-19 09:34:05', '2021-06-23 09:34:00', NULL, 5, 5),
(29, 'work3', 'complete work3', '2021-06-19 09:40:38', '2021-06-21 09:40:00', NULL, 7, 7);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'Bangladesh',
  `points` int(11) NOT NULL DEFAULT 0,
  `join_date` datetime NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'employee'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `password`, `phone`, `country`, `points`, `join_date`, `type`) VALUES
(1, 'Zahirul Islam', 'zahlambo@gmail.com', '1e668eaeff8dc9ca336460a44f44eb4f99f807d7eaae39f0f3915a50ec66fdfa', '1842797801', 'Bangladesh', 0, '2021-05-10 21:30:37', 'admin'),
(3, 'imam', 'imam@gmail.com', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '1842797802', 'Bangladesh', 0, '2021-05-10 21:33:21', 'employee'),
(4, 'test ', 'test100@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '09895672783', 'bangladesh', 12, '2021-06-06 11:26:31', 'employee'),
(5, 'james', 'james@gmail.com', 'eba2346346bce6e941a9ff0a0c96e0e9d4282b658bd72ca2bc93d81021de08d0', '0877623472', 'bangladesh', 0, '2021-06-06 19:24:42', 'employee'),
(7, 'jim', 'jim@gmail.com', 'b148f9352a4521ff41accc5ff7d81f765523967e6e3db875183dce3041085184', '987427987', 'bangladesh', 2, '2021-06-06 19:45:49', 'employee'),
(8, 'arpita', 'arpita4961@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '2639877894', 'Bangladesh', 0, '2021-06-18 22:27:35', 'admin'),
(9, 'john', 'john@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '872476498', 'usa', 0, '2021-06-19 09:31:50', 'employee');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `time` datetime NOT NULL,
  `point` int(11) DEFAULT NULL,
  `employeesid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `title`, `category`, `content`, `time`, `point`, `employeesid`) VALUES
(5, 'testnew cat', 'testcat', 'no idea ', '2021-06-19 10:33:40', NULL, 7);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `reported_to` int(11) DEFAULT NULL,
  `time` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `employeesid` int(11) NOT NULL,
  `admin_feedback` longtext DEFAULT NULL,
  `feedback_from_reported` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `reported_to`, `time`, `title`, `description`, `employeesid`, `admin_feedback`, `feedback_from_reported`) VALUES
(7, 9, '2021-06-19 10:19:29', 'talk to much', 'john talk to much during work', 7, 'lll', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `task_by_others`
--

CREATE TABLE `task_by_others` (
  `id` int(11) NOT NULL,
  `given_to` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `deadline` datetime NOT NULL,
  `time` datetime NOT NULL,
  `submission_time` datetime DEFAULT NULL,
  `points` int(11) NOT NULL DEFAULT 0,
  `employeesid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task_by_others`
--

INSERT INTO `task_by_others` (`id`, `given_to`, `title`, `description`, `deadline`, `time`, `submission_time`, `points`, `employeesid`) VALUES
(7, 9, 'other task', 'testing', '2021-06-20 02:00:00', '2021-06-19 10:42:21', NULL, 2, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcomment362862` (`employeesid`),
  ADD KEY `FKcomment601927` (`postid`);

--
-- Indexes for table `daily_work`
--
ALTER TABLE `daily_work`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdaily_work185479` (`employeesid`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpost589699` (`employeesid`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKreport559129` (`employeesid`);

--
-- Indexes for table `task_by_others`
--
ALTER TABLE `task_by_others`
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `employeesid` (`employeesid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `daily_work`
--
ALTER TABLE `daily_work`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `task_by_others`
--
ALTER TABLE `task_by_others`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `FKcomment362862` FOREIGN KEY (`employeesid`) REFERENCES `employees` (`id`),
  ADD CONSTRAINT `FKcomment601927` FOREIGN KEY (`postid`) REFERENCES `post` (`id`);

--
-- Constraints for table `daily_work`
--
ALTER TABLE `daily_work`
  ADD CONSTRAINT `FKdaily_work185479` FOREIGN KEY (`employeesid`) REFERENCES `employees` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FKpost589699` FOREIGN KEY (`employeesid`) REFERENCES `employees` (`id`);

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FKreport559129` FOREIGN KEY (`employeesid`) REFERENCES `employees` (`id`);

--
-- Constraints for table `task_by_others`
--
ALTER TABLE `task_by_others`
  ADD CONSTRAINT `task_by_others_ibfk_1` FOREIGN KEY (`employeesid`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
