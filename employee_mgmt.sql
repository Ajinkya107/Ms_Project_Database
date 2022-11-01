-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2022 at 09:41 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_mgmt`
--

-- --------------------------------------------------------

--
-- Table structure for table `building`
--

CREATE TABLE `building` (
  `building_code` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date_built` varchar(250) NOT NULL,
  `cost` decimal(15,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `building`
--

INSERT INTO `building` (`building_code`, `name`, `date_built`, `cost`) VALUES
('A001', 'The Capital', '01-01-2022', '5000000');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(5) NOT NULL,
  `office_no` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `budget` decimal(15,0) NOT NULL,
  `department_head` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `office_no`, `name`, `budget`, `department_head`) VALUES
(1, 1, 'Blockchain', '50000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `div_id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `dept_id` int(5) NOT NULL,
  `division_head` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `division`
--

INSERT INTO `division` (`div_id`, `name`, `dept_id`, `division_head`) VALUES
(1, 'Division A', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_code` varchar(30) NOT NULL,
  `office_no` int(5) NOT NULL,
  `dept_id` int(5) DEFAULT NULL,
  `div_id` int(5) DEFAULT NULL,
  `emp_name` varchar(30) NOT NULL,
  `project_no` int(5) DEFAULT NULL,
  `role` varchar(30) DEFAULT NULL,
  `salary` decimal(10,0) DEFAULT NULL,
  `total_hours` int(5) DEFAULT NULL,
  `hourly_rate` decimal(15,0) NOT NULL,
  `phone_no` varchar(10) NOT NULL,
  `emp_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_code`, `office_no`, `dept_id`, `div_id`, `emp_name`, `project_no`, `role`, `salary`, `total_hours`, `hourly_rate`, `phone_no`, `emp_type`) VALUES
('INF-AHM-01', 1, 1, 1, 'John Doe', 3, 'Project Manager', '50000', 50, '0', '1234567890', 'Permanent'),
('INF-AHM-02', 1, 1, 1, 'Jack Aranda', 3, 'Developer', '30000', 30, '0', '0987654321', 'Permanent'),
('INF-AHM-03', 1, NULL, 1, 'Allie Grater', 3, 'Developer', '20000', 20, '1000', '5463782901', 'Project Based'),
('INF-AHM-05', 1, 0, 1, 'olive Yew', 3, 'Developer', '10000', 10, '1000', '1236547890', 'Project Based'),
('INF-AHM-07', 1, 0, 1, 'Willie Makit', NULL, NULL, '30000', 10, '1000', '2341567890', 'Project Based');

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `office_no` int(5) NOT NULL,
  `building_code` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `area` varchar(50) NOT NULL,
  `phone_no` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`office_no`, `building_code`, `name`, `area`, `phone_no`) VALUES
(1, 'A001', 'Inferenz', 'Science City', '9876543210');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `project_no` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `budget` decimal(15,0) NOT NULL,
  `done_tasks` varchar(250) DEFAULT NULL,
  `pending_tasks` varchar(250) DEFAULT NULL,
  `start_date` varchar(250) NOT NULL,
  `end_date` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`project_no`, `name`, `budget`, `done_tasks`, `pending_tasks`, `start_date`, `end_date`) VALUES
(3, 'LiberAR', '50000', 'Admin Module Completed, Sprint 1 Done.', 'Customer Half Module Pending.', '01-04-2022', '01-05-2022'),
(4, 'project2', '20000', NULL, NULL, '01/04/2022', '02/05/2022'),
(5, 'project3', '20000', NULL, NULL, '01/04/2022', '02/05/2022'),
(6, 'project4', '20000', NULL, NULL, '01/04/2022', '01/05/2022'),
(7, 'project5', '20000', NULL, NULL, '01/04/2022', '01/05/2022');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`building_code`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`div_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_code`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`office_no`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `div_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `office_no` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_no` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
