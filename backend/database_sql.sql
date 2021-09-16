-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2021 at 01:29 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbms`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `c_id` varchar(20) NOT NULL,
  `c_name` varchar(100) NOT NULL,
  `credits` varchar(100) NOT NULL,
  `mids` varchar(100) NOT NULL,
  `compre` varchar(100) NOT NULL,
  `handout` varchar(1000) NOT NULL,
  `c_avg_rating` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`c_id`, `c_name`, `credits`, `mids`, `compre`, `handout`, `c_avg_rating`) VALUES
('cs f111', 'Computer Programing', '4', '2021-03-31', '2021-05-28', 'cs_f111.pdf', 4),
('cs f211', 'DSA', '4', '2021-04-07', '2021-05-28', 'cs_f211.pdf', 1.5),
('cs f213', 'Object Oriented Programing', '4', '2021-03-17', '2021-06-11', 'cs_f213.pdf', 4),
('hss f112', 'introductory philosophy', '3', '2021-04-15', '2021-05-28', 'hss_f112.pfd', 3);

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `id` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `details`
--

INSERT INTO `details` (`id`, `password`, `role`, `status`) VALUES
('2019A0000H', '$2b$10$d5dhg/6lJnXf3Qtux2H5FeD2U9Kf3YgSni7ROXg50Kq1jZ9f/Nu2.', 'admin', 'v'),
('2019A7PS0047H', '$2b$10$p2YUPNxKrkz1p5lvNCxFQuOfLp9RlMrD5dC9sM/TU9jWuw67F4K2C', 'student', 'v'),
('2019A7PS0095H', '$2b$10$qnnRfDhgeDW8CwplP9zAlucCYJXQF3ftqqn.Z6GmDyh86uNI6i1Ka', 'student', 'v'),
('2019P0000H', '$2b$10$XPMj/WcYvSwQsdqwWOueruX4heQP..6Lh.xg4QJJWqghUbkvqtgBa', 'professor', 'v'),
('2019P0001H', '$2b$10$r6NWSnrd2lOZhvTCC0Mwoe2dCre0ZOAUM5KAHVAsnV8JAR7JrA9Yy', 'professor', 'v');

-- --------------------------------------------------------

--
-- Table structure for table `feedback_course`
--

CREATE TABLE `feedback_course` (
  `c_id` varchar(20) NOT NULL,
  `s_id` varchar(20) NOT NULL,
  `c_rating` varchar(100) NOT NULL,
  `c_review` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback_course`
--

INSERT INTO `feedback_course` (`c_id`, `s_id`, `c_rating`, `c_review`) VALUES
('cs f111', '2019A7PS0047H', '3', 'a easy course but a lot of rot-learning'),
('cs f111', '2019A7PS0095H', '5', 'The best intro course you can get!'),
('cs f211', '2019A7PS0047H', '2', 'The materials provided were quite sparse'),
('cs f211', '2019A7PS0095H', '1', 'Not all concepts were covered'),
('cs f213', '2019A7PS0047H', '4', 'A very in-depth learning about OOPS'),
('hss f112', '2019A7PS0095H', '3', 'The course is interesting but a lot to remember.');

--
-- Triggers `feedback_course`
--
DELIMITER $$
CREATE TRIGGER `cAvgRating` AFTER INSERT ON `feedback_course` FOR EACH ROW BEGIN
    DECLARE n double;
    select avg(c_rating) into n from feedback_course where c_id = NEW.c_id;
    update course set c_avg_rating = n where c_id = NEW.c_id;
    
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `feedback_prof`
--

CREATE TABLE `feedback_prof` (
  `s_id` varchar(20) NOT NULL,
  `p_id` varchar(20) NOT NULL,
  `p_rating` varchar(100) NOT NULL,
  `p_review` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback_prof`
--

INSERT INTO `feedback_prof` (`s_id`, `p_id`, `p_rating`, `p_review`) VALUES
('2019A7PS0047H', '2019P0000H', '4', 'The explanation is simple and covers real-world problems'),
('2019A7PS0095H', '2019P0000H', '4', 'Even tho his pace is fast,his way of teaching is clear.'),
('2019A7PS0095H', '2019P0001H', '3', 'I was not able to coup-up with his way of teaching');

--
-- Triggers `feedback_prof`
--
DELIMITER $$
CREATE TRIGGER `pAvgRating` AFTER INSERT ON `feedback_prof` FOR EACH ROW BEGIN
    DECLARE n double;
    select avg(p_rating) into n from feedback_prof where p_id = NEW.p_id;
    update professor set p_avg_rating = n where p_id = NEW.p_id;
    
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `p_id` varchar(20) NOT NULL,
  `p_name` varchar(100) NOT NULL,
  `p_email` varchar(100) NOT NULL,
  `p_contact_no` varchar(100) NOT NULL,
  `p_avg_rating` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`p_id`, `p_name`, `p_email`, `p_contact_no`, `p_avg_rating`) VALUES
('2019P0000H', 'michel reeves', 'mr@gmail.com', '5987462516', 4),
('2019P0001H', 'shanmukh deshpanday', 'sd@gmail.com', '7845931265', 3);

-- --------------------------------------------------------

--
-- Table structure for table `registers`
--

CREATE TABLE `registers` (
  `c_id` varchar(20) NOT NULL,
  `s_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `registers`
--

INSERT INTO `registers` (`c_id`, `s_id`) VALUES
('cs f111', '2019A7PS0047H'),
('cs f111', '2019A7PS0095H'),
('cs f211', '2019A7PS0047H'),
('cs f211', '2019A7PS0095H'),
('cs f213', '2019A7PS0047H'),
('hss f112', '2019A7PS0047H');

-- --------------------------------------------------------

--
-- Stand-in structure for view `reg_courses`
-- (See below for the actual view)
--
CREATE TABLE `reg_courses` (
`c_id` varchar(20)
,`c_name` varchar(100)
,`s_id` varchar(20)
);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `s_id` varchar(20) NOT NULL,
  `s_name` varchar(100) NOT NULL,
  `s_email` varchar(100) NOT NULL,
  `s_contact_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`s_id`, `s_name`, `s_email`, `s_contact_no`) VALUES
('2019A7PS0047H', 'Abhigna Srikala', 'f20190047@hyderabad.bits-pilani.ac.in', '8497625133'),
('2019A7PS0095H', 'Vamshi Duvva', 'f20190095@hyderabad.bits-pilani.ac.in', '7895462186');

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `c_id` varchar(20) NOT NULL,
  `p_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`c_id`, `p_id`) VALUES
('cs f111', '2019P0000H'),
('hss f112', '2019P0001H');

-- --------------------------------------------------------

--
-- Structure for view `reg_courses`
--
DROP TABLE IF EXISTS `reg_courses`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `reg_courses`  AS   (select `c`.`c_id` AS `c_id`,`c`.`c_name` AS `c_name`,`r`.`s_id` AS `s_id` from (`course` `c` join `registers` `r`) where `c`.`c_id` = `r`.`c_id`)  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback_course`
--
ALTER TABLE `feedback_course`
  ADD PRIMARY KEY (`c_id`,`s_id`),
  ADD KEY `feedback_c_sid` (`s_id`);

--
-- Indexes for table `feedback_prof`
--
ALTER TABLE `feedback_prof`
  ADD PRIMARY KEY (`s_id`,`p_id`),
  ADD KEY `feedback_p_pid` (`p_id`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`p_id`);

--
-- Indexes for table `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`c_id`,`s_id`),
  ADD KEY `enrol_sid` (`s_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`c_id`,`p_id`),
  ADD KEY `fk.p_id` (`p_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback_course`
--
ALTER TABLE `feedback_course`
  ADD CONSTRAINT `feedback_c_cid` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_c_sid` FOREIGN KEY (`s_id`) REFERENCES `student` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback_prof`
--
ALTER TABLE `feedback_prof`
  ADD CONSTRAINT `feedback_p_pid` FOREIGN KEY (`p_id`) REFERENCES `professor` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feedback_p_sid` FOREIGN KEY (`s_id`) REFERENCES `student` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `p_user_id` FOREIGN KEY (`p_id`) REFERENCES `details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `registers`
--
ALTER TABLE `registers`
  ADD CONSTRAINT `enrol_cid` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enrol_sid` FOREIGN KEY (`s_id`) REFERENCES `student` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `s_user_id` FOREIGN KEY (`s_id`) REFERENCES `details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teaches`
--
ALTER TABLE `teaches`
  ADD CONSTRAINT `fk.c_id` FOREIGN KEY (`c_id`) REFERENCES `course` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk.p_id` FOREIGN KEY (`p_id`) REFERENCES `professor` (`p_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
