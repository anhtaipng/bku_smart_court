-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2021 at 07:24 PM
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
-- Database: `food_court`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `_id_order` int(10) NOT NULL,
  `_id_user` int(10) NOT NULL,
  `orderItems` text COLLATE utf8_unicode_ci NOT NULL,
  `totalPrice` int(9) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `isDone` tinyint(1) NOT NULL,
  `isReceived` tinyint(1) NOT NULL,
  `requirement` text COLLATE utf8_unicode_ci NOT NULL,
  `vendor` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`_id_order`, `_id_user`, `orderItems`, `totalPrice`, `date`, `isDone`, `isReceived`, `requirement`, `vendor`) VALUES
(71, 5, '     10Red Bull', 120000, '2020-07-05 22:00:42', 1, 1, 'no cold', 'Computer Department'),
(72, 8, '     1Coca', 10000, '2020-07-05 22:26:12', 0, 0, '', 'Electronic Department');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `_id` int(10) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `category` text COLLATE utf8_unicode_ci NOT NULL,
  `image` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(10) NOT NULL,
  `brand` text COLLATE utf8_unicode_ci NOT NULL,
  `rating` float NOT NULL,
  `numReviews` int(10) DEFAULT NULL,
  `countInStock` int(5) DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL DEFAULT 'No description',
  `vendor` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`_id`, `name`, `category`, `image`, `price`, `brand`, `rating`, `numReviews`, `countInStock`, `description`, `vendor`) VALUES
(1, 'Bread', 'Food', 'https://i.pinimg.com/originals/23/55/13/2355134fe896829c6e4e4ba8300f237b.jpg', 12000, 'Kitchen', 4.5, 10, 0, 'No description', 'Computer Department'),
(2, 'Noodle with beef', 'Food', 'https://monngondongian.com/wp-content/uploads/2019/04/bat-bun-bo-hue-dam-da-huong-vi.jpg', 25000, 'Kitchen', 4.5, 10, 89, 'No description', 'Computer Department'),
(4, 'Pepsi', 'Drinks', 'https://donchicken.vn/pub/media/catalog/product/cache/8872124951f387c8ded3f228faa55bea/t/h/thumbs_pepsi.png', 10000, 'Pepsico', 0, 0, 0, 'No description', 'Computer Department'),
(5, 'Coca', 'Drinks', 'https://iwater.vn/Image/Picture/Water/coca%20330ml.png', 10000, 'CocaLtd', 0, 0, 6, 'No description', 'Electronic Department'),
(6, 'Pho', 'Food', 'https://s23209.pcdn.co/wp-content/uploads/2018/05/Instant-Pot-PhoIMG_5386-360x360.jpg', 25000, 'Kitchen', 0, 0, 81, 'Pho is very sexy', 'Electronic Department'),
(7, 'Red Bull', 'Drinks', 'https://image.voso.vn/users/vosoimage/images/4979dfb05ed40087dd8531133c6e578d?t%5B0%5D=compress%3Alevel%3D100&accessToken=55191bc97a9ddad45e46f0897021c372545e6b78630b248db4650a83b16c8e29', 12000, 'Redbull', 0, 0, 90, 'Energetic drinks for studying and working', 'Computer Department'),
(8, 'Hambuger', 'Food', 'https://shipdoandemff.com/wp-content/uploads/2018/05/Hamburger-b%C3%B2.png', 22000, 'Kitchen', 0, 0, 30, 'No description', 'Electronic Department'),
(9, 'Sausage', 'Food', 'https://cuetopiatexas.com/wp-content/uploads/2015/12/hot-texas-sausage-1.jpg', 20000, 'Kitchen', 0, 0, 100, 'Perfect Hotdog', 'Electronic Department');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `_id` int(5) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `isManager` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isChef` tinyint(1) NOT NULL,
  `isITstaff` tinyint(1) NOT NULL,
  `vendor` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`_id`, `name`, `email`, `password`, `isManager`, `isAdmin`, `isChef`, `isITstaff`, `vendor`) VALUES
(1, 'Anh Tai', 'anhtaipng@gmail.com', '123456', 1, 1, 1, 1, 'Computer Department'),
(5, 'Tai', 'anhtai@gmail.com', '12', 0, 0, 0, 0, ''),
(8, 'taideptrai', 'anhtai123@gmail.com', '123', 0, 0, 1, 0, 'Electronic Department'),
(12, 'Golden Ramsey', 'chef@gmail.com', '123456', 0, 0, 1, 0, 'Computer Department'),
(13, 'Bill Gate', 'itstaff@gmail.com', '123456', 0, 0, 0, 1, ''),
(14, 'Mark', 'vendor1@gmail.com', '123456', 0, 1, 0, 0, 'Computer Department'),
(15, 'Jeff', 'vendor2@gmail.com', '123456', 0, 1, 0, 0, 'Electronic Department'),
(16, 'Anh Tai', 'manager@gmail.com', '123456', 1, 0, 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`_id`, `name`) VALUES
(3, 'Computer Department'),
(4, 'Electronic Department');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`_id_order`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `_id_order` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
