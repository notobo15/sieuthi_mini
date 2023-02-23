﻿--
-- Script was generated by Devart dbForge Studio 2020 for MySQL, Version 9.0.338.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2/23/2023 7:02:43 PM
-- Server version: 10.4.27
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE sieuthi_mini;

--
-- Drop table `cart`
--
DROP TABLE IF EXISTS cart;

--
-- Drop table `category_product`
--
DROP TABLE IF EXISTS category_product;

--
-- Drop table `order`
--
DROP TABLE IF EXISTS `order`;

--
-- Drop table `order_detail`
--
DROP TABLE IF EXISTS order_detail;

--
-- Drop table `permission_detail`
--
DROP TABLE IF EXISTS permission_detail;

--
-- Drop table `permistion`
--
DROP TABLE IF EXISTS permistion;

--
-- Drop table `product`
--
DROP TABLE IF EXISTS product;

--
-- Drop table `product_image`
--
DROP TABLE IF EXISTS product_image;

--
-- Drop table `user`
--
DROP TABLE IF EXISTS user;

--
-- Drop table `user_per`
--
DROP TABLE IF EXISTS user_per;

--
-- Set default database
--
USE sieuthi_mini;

--
-- Create table `user_per`
--
CREATE TABLE user_per (
  user_per_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  per_id int(11) DEFAULT NULL,
  status tinyint(1) DEFAULT 1,
  PRIMARY KEY (user_per_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `user`
--
CREATE TABLE user (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  user_name varchar(255) NOT NULL DEFAULT '',
  password varchar(255) NOT NULL DEFAULT '',
  first_name varchar(255) DEFAULT NULL,
  last_name varchar(255) DEFAULT NULL,
  phone varchar(20) DEFAULT NULL,
  birth_date date DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  gender varchar(10) DEFAULT NULL,
  delivery_address varchar(255) DEFAULT NULL,
  status tinyint(1) NOT NULL DEFAULT 1,
  createAt date DEFAULT curdate(),
  PRIMARY KEY (user_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 17,
AVG_ROW_LENGTH = 2978,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `product_image`
--
CREATE TABLE product_image (
  prod_img_id int(11) NOT NULL AUTO_INCREMENT,
  product_id int(11) NOT NULL,
  image_name varchar(300) NOT NULL,
  primary_img tinyint(1) DEFAULT NULL,
  PRIMARY KEY (prod_img_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 31,
AVG_ROW_LENGTH = 744,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `product`
--
CREATE TABLE product (
  product_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(300) NOT NULL,
  slug varchar(255) NOT NULL DEFAULT '',
  description text DEFAULT NULL,
  price double NOT NULL,
  mass varchar(200) NOT NULL,
  ingredient text DEFAULT NULL,
  how_to_use text DEFAULT NULL,
  preserve text DEFAULT NULL,
  trademark varchar(200) DEFAULT NULL,
  make_in varchar(200) DEFAULT NULL,
  cate_id int(11) NOT NULL,
  suppilier_id int(11) NOT NULL,
  quantity int(11) NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  createAt date DEFAULT curdate(),
  expire_date date DEFAULT NULL,
  PRIMARY KEY (product_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 9,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `permistion`
--
CREATE TABLE permistion (
  per_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL DEFAULT '',
  PRIMARY KEY (per_id, name)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `permission_detail`
--
CREATE TABLE permission_detail (
  per_det_id int(11) NOT NULL AUTO_INCREMENT,
  per_idi int(11) DEFAULT NULL,
  action_name varchar(255) DEFAULT NULL,
  action_code varchar(255) DEFAULT NULL,
  action_status tinyint(1) DEFAULT 1,
  PRIMARY KEY (per_det_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `order_detail`
--
CREATE TABLE order_detail (
  order_det_id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) DEFAULT NULL,
  product_id int(11) DEFAULT NULL,
  price decimal(19, 2) DEFAULT NULL,
  quantity int(11) DEFAULT NULL,
  PRIMARY KEY (order_det_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `order`
--
CREATE TABLE `order` (
  order_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  order_date date NOT NULL DEFAULT curdate(),
  status varchar(255) DEFAULT NULL,
  createAt date DEFAULT curdate(),
  PRIMARY KEY (order_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `category_product`
--
CREATE TABLE category_product (
  category_id int(11) NOT NULL,
  name varchar(200) NOT NULL,
  name_code varchar(200) NOT NULL,
  PRIMARY KEY (category_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 712,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `cart`
--
CREATE TABLE cart (
  cart_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  product_id int(11) DEFAULT NULL,
  quatity int(11) DEFAULT NULL,
  createAt date DEFAULT curdate(),
  PRIMARY KEY (cart_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

-- 
-- Dumping data for table user_per
--
-- Table sieuthi_mini.user_per does not contain any data (it is empty)

-- 
-- Dumping data for table user
--
INSERT INTO user VALUES
(1, 'admin1', '1234', 'binh', 'nguyen', '0123456789', '2023-01-22', 'HCM', 'nam', 'HCM', 1, '2023-02-22'),
(2, 'user1', '1234', 'teo', 'van', '0123456789', '2000-11-01', 'LA', 'nu', 'HCM', 1, '2023-02-22'),
(3, 'admin2', '12345', NULL, NULL, '123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(4, 'admin3', '12345', NULL, NULL, '123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(5, 'admin4', '12345', NULL, NULL, '123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(6, 'admin5', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(7, 'admin6', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(8, 'admin7', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(9, 'admin8', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(10, 'admin9', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(11, 'admin0', '1234', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-22'),
(12, 'user2', '12345', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-23'),
(13, 'user3', '$2b$10$MyCiRHmY6an8lZZy.H7trOdjVoTxqZPBtqI9N0vgsIIwIKnaNxpSa', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-23'),
(14, 'user4', '$2b$10$UJEKfrKmSqMJ/wvVmCylg.XjsBIOJqFtO1ftDs7Rg6OAKKdSk7MqS', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-23'),
(15, 'user5', '$2b$10$Cfco4cgAbSqOm7EMnJ/OeuhUrUzOlzoH5j2A078dO8Cr/gVKHulza', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-23'),
(16, 'user9', '$2b$10$BqreXctzL.CsDbW3y6qo3ulNPwyI5yF4YQP/Sy7VKPk/9CEqmkuni', NULL, NULL, '0123456789', NULL, NULL, NULL, NULL, 1, '2023-02-23');

-- 
-- Dumping data for table product_image
--
INSERT INTO product_image VALUES
(1, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920304347.jpg', 1),
(2, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920311202.jpg', NULL),
(3, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920317419.jpg', NULL),
(4, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920321184.jpg', NULL),
(5, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920324936.jpg', NULL),
(6, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202202111435531681.jpg', NULL),
(7, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202211181144401243.jpg', NULL),
(8, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-202211181138546073.jpg', 1),
(9, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-202202111517241801.jpg', NULL),
(10, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512050583.jpg', NULL),
(11, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512053684.jpg', NULL),
(12, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512056156.jpg', NULL),
(13, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512058497.jpg', NULL),
(14, 2, 'mi-chua-cay-3-mien-65g-thung-4-org.jpg', NULL),
(15, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316023474.jpg', 1),
(16, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202202101704465651.jpg', NULL),
(17, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316162632.jpg', NULL),
(18, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316188274.jpg', NULL),
(19, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316201422.jpg', NULL),
(20, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316211419.jpg', NULL),
(21, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316225778.jpg', NULL),
(22, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316233493.jpg', NULL),
(23, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-201912081340008681.jpg', 1),
(24, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-202202120757304010.jpg', NULL),
(25, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-202210112203096587.jpg', NULL),
(26, 4, '-202209200940563078.jpg', NULL),
(27, 4, '-202209200940567793.jpg', NULL),
(28, 4, '-202209200940583421.jpg', NULL),
(29, 4, '-202209200941000082.jpg', NULL),
(30, 4, '-202209200941004595.jpg', NULL);

-- 
-- Dumping data for table product
--
INSERT INTO product VALUES
(1, 'Thùng 30 gói mì Hảo Hảo tôm chua cay 75g', 'mi-hao-hao-tom-chua-cay-75g-30', 'Sợi mì vàng dai ngon hòa quyện trong nước súp tôm chua cay Hảo Hảo, đậm đà thấm đẫm từng sợi sóng sánh cùng hương thơm quyến rũ ngất ngây. Mì Hảo Hảo tôm chua cay gói 75g là lựa chọn hấp dẫn không thể bỏ qua đặc biệt là những ngày bận rộn cần bổ sung năng lượng nhanh chóng đơn giản mà vẫn đủ chất', 118000, '75g / gói', 'VẮT MÌ - Bột mì (bổ sung vi chất (kẽm, sắt)), dầu thực vật (dầu cọ, chất chống oxy hoá (BHA (320), BHT (321))), tinh bột, muối, đường, nước mắm, chất điều vị (mononatri glutamat (621)), chất ổn định (pentanatri triphosphat (451(i), kali carbonat (501(i))), chất điều chỉnh độ acid (natri carbonat (500(i))), bột nghệ, chất tạo màu tự nhiên (curcumin (100(i))).', 'Cho vắt mì, gói súp và gói dầu vào tô. Chế nước sôi vào khoảng 400 ml, đậy nắp lại và chờ 3 phút. Trộn đều và dùng được ngay.', 'Để nơi khô ráo, thoáng mát tránh ánh nắng mặt trời.', 'Hảo Hảo (Việt Nam)', 'Việt Nam', 1, 1, 100, 1, '2023-02-23', NULL),
(2, 'Thùng 30 gói mì 3 Miền tôm chua cay 65g', 'mi-chua-cay-3-mien-65g-thung', 'Sở hữu nét đậm đà chuẩn hương vị truyền thống. Mì 3 Miền tôm chua cay gói 65g có được vị chua cay từ quá trình tìm tòi cũng như chắt lọc các nét đặc trưng nhất của các món chua cay dọc 3 miền tổ quốc. Để rồi thành phẩm mang đến cho người tiêu dùng hương vị tinh tế nhất và tuyệt hảo nhất', 89000, '65g / gói', 'VẮT MÌ - Bột mì (75,0%), shortening, phẩm màu (curcumin (E100(i)).\r\nGÓI GIA VỊ - Bột tôm (30 g/kg), dầu cọ, muối, đường, bột tỏi, bột ớt, hành lá sấy, chất điều chỉnh độ acid (citric acid (E330)), chất điều vị (monosodium L-glutamate (E621), disodium 5''-inosinate (E631), disodium 5''-guanylate (E627)).', 'Cho vắt mì và gói gia vị vào tô. Chế khoảng 350 ml nước sôi vào tô mì, đậy nắp kín và chờ trong 3 phút. Mở nắp, trộn đều và bắt đầu thưởng thức.', 'Để nơi khô ráo, thoáng mát tránh ánh nắng mặt trời.', '3 Miền (Việt Nam)', 'Việt Nam', 1, 2, 50, 1, '2023-02-23', NULL),
(3, 'Thùng 30 gói hủ tiếu Nam Vang Cung Đình 78g', 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g', 'Hủ tiếu ăn liền là bữa ăn cực tiện lợi và thơm ngon. 30 gói hủ tiếu Nam Vang Cung Đình 78g chính hãng hủ tiếu Cung Đình hương vị Nam Vang đặc trưng thấm đều trong từng sợi hủ tiếu dai ngon đậm đà cực đã cùng mùi hương hấp dẫn lôi cuốn không thể chối từ', 288000, '78g / gói', 'Sản phẩm có 2 thành phần chính: và vắt hủ tiếu và các gói trong vị, trong đó đặc biệt có gói xốt tôm mực cực hấp dẫn, gia vị ngon đúng điệu Nam Vang. Sản phẩm cung cấp cho cơ thể carbohydrate, chất đạm và chất béo', 'Cho hủ tiếu, gia vị vào tô, chế khoảng 400ml nước sôi và đậy nắp trong 3 phút', 'Bảo quản nơi khô ráo, tránh ánh nắng mặt trời. Nên chế biến ngay khi mở bao bì. Tránh để gần hoá chất và sản phẩm có mùi mạnh.', 'Cung Đình (Việt Nam)', 'Việt Nam', 1, 3, 50, 1, '2023-02-23', NULL),
(4, 'Thùng 30 gói mì khoai tây Omachi xốt bò hầm 80g', 'thung-mi-omachi-sot-bo-ham-goi-80g-30-goi', 'Sợi mì từ trứng và khoai tây vàng dai ngon hòa trong nước súp Omachi xốt bò hầm đậm đà cùng hương thơm nứt mũi tạo ra siêu phẩm mì với sự kết hợp hương vị hài hòa, độc đáo. 30 gói mì khoai tây Omachi xốt bò hầm 80g tiện lợi, thơm ngon hấp dẫn không thể chối từ', 252000, '65g / gói', 'Vắt mì - bột mì, dầu cọ, tinh bột khoai mì, chất ổn định, tinh bột khoai tây, muối, nước mắm, chất điều vị, chiết xuất nấm men, chất tạo xốp, bột lòng đỏ trứng, hỗn hợp protein lòng trắng trứng, xiro ngô nồng độ fructose cao, chiết xuất trái dành dành, chất chống oxy hóa', 'Cho vắt mì, gói nêm, gói rau và gói dầu vào tô. Đổ vào 400ml nước sôi. Đậy nắp trong 3 phút. Mở nắp ra, trộn đều là dùng được ngay.', 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Không để gần hóa chất hoặc sản phẩm có mùi mạnh.', 'Omachi (Việt Nam)', 'Việt Nam', 1, 2, 50, 1, '2023-02-23', NULL),
(6, '', '', '', 0, '', '', NULL, NULL, NULL, NULL, 0, 0, 0, 0, '2023-02-23', NULL),
(7, 'Thùng 30 gói bún giò heo Hằng Nga 75g', '', NULL, 260000, '75g', NULL, NULL, NULL, NULL, NULL, 4, 5, 100, 1, '2023-02-23', NULL),
(8, 'Thùng 30 gói bún giò heo Hằng Nga 75g', 'thung-30-goi-bun-gio-heo-hang-nga-75g', NULL, 260000, '75g', NULL, NULL, NULL, NULL, NULL, 4, 5, 100, 1, '2023-02-23', NULL);

-- 
-- Dumping data for table permistion
--
-- Table sieuthi_mini.permistion does not contain any data (it is empty)

-- 
-- Dumping data for table permission_detail
--
-- Table sieuthi_mini.permission_detail does not contain any data (it is empty)

-- 
-- Dumping data for table order_detail
--
-- Table sieuthi_mini.order_detail does not contain any data (it is empty)

-- 
-- Dumping data for table `order`
--
-- Table sieuthi_mini.`order` does not contain any data (it is empty)

-- 
-- Dumping data for table category_product
--
INSERT INTO category_product VALUES
(0, '', ''),
(1, 'Mì ăn liền', 'mi'),
(2, 'Hủ tiếu, miến, bánh canh', 'hu-tieu'),
(3, 'Cháo gói, cháo tươi', 'chao-an-lien'),
(4, 'Phở, bún ăn liền', 'pho-bun'),
(5, 'Dầu ăn', 'dau-an'),
(6, 'Đường', 'duong'),
(7, 'Hạt nêm, bột ngọt, bột canh', 'hat-nem'),
(8, 'Muối', 'muoi'),
(9, 'Nước mắm, Nước tương', 'nuoc-mam-nuoc-tuong'),
(10, 'Nước chấm, mắm', 'sot-nuoc-cham'),
(11, 'Gia vị nêm sẵn', 'gia-vi-nem-san'),
(12, 'Gạo các loại', 'cac-loai-gao'),
(13, 'Bột các loại', 'cac-loai-bot'),
(14, 'Xúc xích, lạp xưởng', 'xuc-xich-lap-xuong'),
(15, 'Đồ chay các loại', 'do-chay-cac-loai'),
(16, 'Đồ hộp các loại', 'do-dong-hop'),
(17, 'Rong biển, bánh tráng, đậu', 'do-kho'),
(18, 'Rau lá', 'rau-sach'),
(19, 'Củ, quả', 'cu-qua'),
(20, 'Trái cây', 'trai-cay'),
(21, 'Thịt các loại', 'thit-cac-loai'),
(22, 'Cá, hải sản', 'ca-tom-muc-ech');

-- 
-- Dumping data for table cart
--
-- Table sieuthi_mini.cart does not contain any data (it is empty)

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;