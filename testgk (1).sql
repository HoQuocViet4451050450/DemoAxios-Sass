-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2025 at 02:08 PM
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
-- Database: `testgk`
--

-- --------------------------------------------------------

--
-- Table structure for table `department_table`
--

CREATE TABLE `department_table` (
  `id` int(11) NOT NULL,
  `tenphong` varchar(220) NOT NULL,
  `mota` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_table`
--

INSERT INTO `department_table` (`id`, `tenphong`, `mota`) VALUES
(6, 'Nhân sự', 'Phòng Nhân sự'),
(8, 'Kế toán', 'Phòng Kế toán'),
(9, 'Marketing', 'Phòng Marketing'),
(10, 'Hỗ trợ khách hàng', 'Phòng Hỗ trợ khách hàng'),
(11, 'Phòng IT', 'Phòng Công nghệ thông tin');

-- --------------------------------------------------------

--
-- Table structure for table `salary_table`
--

CREATE TABLE `salary_table` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `luongtheogio` double NOT NULL,
  `tonggiolam` double NOT NULL,
  `tienthuong` double NOT NULL,
  `tienphat` double NOT NULL,
  `tongluong` double NOT NULL,
  `thang` int(11) NOT NULL,
  `nam` int(11) NOT NULL,
  `trangthai` varchar(50) NOT NULL,
  `ngaythanhtoan` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary_table`
--

INSERT INTO `salary_table` (`id`, `user_id`, `luongtheogio`, `tonggiolam`, `tienthuong`, `tienphat`, `tongluong`, `thang`, `nam`, `trangthai`, `ngaythanhtoan`) VALUES
(7, 11, 15000, 30, 20000, 10000, 460000, 1, 2025, 'Chưa thanh toán', NULL),
(8, 12, 15000, 35, 10000, 0, 535000, 1, 2025, 'Chưa thanh toán', NULL),
(9, 13, 15000, 25, 0, 10000, 365000, 1, 2025, 'Chưa thanh toán', NULL),
(10, 14, 15000, 40, 0, 0, 600000, 1, 2025, 'Chưa thanh toán', NULL),
(11, 15, 15000, 55, 0, 0, 825000, 1, 2025, 'Chưa thanh toán', NULL),
(12, 16, 15000, 15, 0, 0, 225000, 1, 2025, 'Chưa thanh toán', NULL),
(13, 11, 16000, 43, 0, 0, 688000, 2, 2025, 'Đã thanh toán', '2025-04-02'),
(14, 12, 16000, 30, 0, 0, 480000, 2, 2025, 'Đã thanh toán', '2025-04-02'),
(15, 13, 16000, 20, 0, 0, 320000, 2, 2025, 'Đã thanh toán', '2025-04-02'),
(16, 14, 16000, 25, 0, 0, 400000, 2, 2025, 'Đã thanh toán', '2025-04-02'),
(17, 15, 16000, 45, 0, 0, 720000, 2, 2025, 'Đã thanh toán', '2025-04-02'),
(18, 16, 16000, 100, 0, 0, 1600000, 2, 2025, 'Đã thanh toán', '2025-04-02');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `phongban_id` int(11) NOT NULL,
  `hoten` varchar(100) NOT NULL,
  `tuoi` int(11) NOT NULL,
  `gioitinh` varchar(30) NOT NULL,
  `diachi` varchar(220) NOT NULL,
  `socccd` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `phongban_id`, `hoten`, `tuoi`, `gioitinh`, `diachi`, `socccd`) VALUES
(11, 6, 'Nhân viên 1', 30, 'Nam', '123 Đường ABC, Quận 1, TP.HCM', '123456789012'),
(12, 6, 'Nhân viên 2', 31, 'Nam', '124 Đường ABC, Quận 1, TP.HCM', '123456789013'),
(13, 8, 'Nhân viên 3', 32, 'Nữ', '124 Đường ABC, Quận 1, TP.HCM', '123456789013'),
(14, 8, 'Nhân viên 4', 33, 'Nữ', '124 Đường ABC, Quận 1, TP.HCM', '123456789013'),
(15, 9, 'Nhân viên 5', 20, 'Nam', '100 Đường ABC, Quận 1, TP.HCM', '123456789030'),
(16, 9, 'Nhân viên 6', 21, 'Nam', '101 Đường ABC, Quận 1, TP.HCM', '123456789035');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department_table`
--
ALTER TABLE `department_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary_table`
--
ALTER TABLE `salary_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `phongban_id` (`phongban_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department_table`
--
ALTER TABLE `department_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `salary_table`
--
ALTER TABLE `salary_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `salary_table`
--
ALTER TABLE `salary_table`
  ADD CONSTRAINT `salary_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_table`
--
ALTER TABLE `user_table`
  ADD CONSTRAINT `user_table_ibfk_1` FOREIGN KEY (`phongban_id`) REFERENCES `department_table` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
