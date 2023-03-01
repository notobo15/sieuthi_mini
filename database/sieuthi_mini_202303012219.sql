﻿--
-- Script was generated by Devart dbForge Studio 2020 for MySQL, Version 9.0.338.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 3/1/2023 10:19:45 PM
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
-- Drop table `ex_user_group`
--
DROP TABLE IF EXISTS ex_user_group;

--
-- Drop table `groups`
--
DROP TABLE IF EXISTS groups;

--
-- Drop table `group_permission`
--
DROP TABLE IF EXISTS group_permission;

--
-- Drop table `import_detail`
--
DROP TABLE IF EXISTS import_detail;

--
-- Drop table `import_mst`
--
DROP TABLE IF EXISTS import_mst;

--
-- Drop table `in_user_permission`
--
DROP TABLE IF EXISTS in_user_permission;

--
-- Drop table `orders`
--
DROP TABLE IF EXISTS orders;

--
-- Drop table `order_detail`
--
DROP TABLE IF EXISTS order_detail;

--
-- Drop table `permission`
--
DROP TABLE IF EXISTS permission;

--
-- Drop table `product`
--
DROP TABLE IF EXISTS product;

--
-- Drop table `product_image`
--
DROP TABLE IF EXISTS product_image;

--
-- Drop table `suppilier`
--
DROP TABLE IF EXISTS suppilier;

--
-- Drop table `user`
--
DROP TABLE IF EXISTS user;

--
-- Drop table `user_group`
--
DROP TABLE IF EXISTS user_group;

--
-- Drop table `user_per`
--
DROP TABLE IF EXISTS user_per;

--
-- Drop table `warehouse`
--
DROP TABLE IF EXISTS warehouse;

--
-- Set default database
--
USE sieuthi_mini;

--
-- Create table `warehouse`
--
CREATE TABLE warehouse (
  warehouse int(11) NOT NULL AUTO_INCREMENT,
  name varchar(250) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  PRIMARY KEY (warehouse)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `user_per`
--
CREATE TABLE user_per (
  user_per_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  per_id int(11) DEFAULT NULL,
  licensed tinyint(1) DEFAULT 1,
  PRIMARY KEY (user_per_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `user_group`
--
CREATE TABLE user_group (
  user_group_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  group_id int(11) DEFAULT NULL,
  PRIMARY KEY (user_group_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
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
  group_id int(11) DEFAULT 5,
  delivery_address varchar(255) DEFAULT NULL,
  status tinyint(1) NOT NULL DEFAULT 1,
  createAt date DEFAULT curdate(),
  PRIMARY KEY (user_id, user_name)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 2978,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `suppilier`
--
CREATE TABLE suppilier (
  suppilier_id int(11) NOT NULL,
  name varchar(250) DEFAULT NULL,
  address varchar(255) DEFAULT NULL,
  phone varchar(20) DEFAULT NULL,
  PRIMARY KEY (suppilier_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 8192,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `product_image`
--
CREATE TABLE product_image (
  prod_img_id int(11) NOT NULL AUTO_INCREMENT,
  product_id int(11) NOT NULL,
  image_name varchar(300) NOT NULL,
  PRIMARY KEY (prod_img_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 56,
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
  img varchar(255) NOT NULL DEFAULT '',
  mass varchar(200) NOT NULL,
  ingredient text DEFAULT NULL,
  how_to_use text DEFAULT NULL,
  preserve text DEFAULT NULL,
  trademark varchar(200) DEFAULT NULL,
  make_in varchar(200) DEFAULT NULL,
  cate_id int(11) NOT NULL,
  quantity int(11) NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  createAt date DEFAULT curdate(),
  expire_date date DEFAULT NULL,
  PRIMARY KEY (product_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 17,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `permission`
--
CREATE TABLE permission (
  per_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(200) NOT NULL DEFAULT '',
  code_name varchar(255) DEFAULT NULL,
  PRIMARY KEY (per_id, name)
)
ENGINE = INNODB,
AUTO_INCREMENT = 46,
AVG_ROW_LENGTH = 4096,
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
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `orders`
--
CREATE TABLE orders (
  order_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  order_date date NOT NULL DEFAULT curdate(),
  status varchar(255) DEFAULT 'Processing',
  PRIMARY KEY (order_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 6553,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `in_user_permission`
--
CREATE TABLE in_user_permission (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  permission_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `import_mst`
--
CREATE TABLE import_mst (
  import_mst_id int(11) NOT NULL AUTO_INCREMENT,
  date date DEFAULT curdate(),
  suppilier_id int(11) DEFAULT NULL,
  warehouse_id int(11) DEFAULT NULL,
  PRIMARY KEY (import_mst_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 8,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `import_detail`
--
CREATE TABLE import_detail (
  import_detail_id int(11) NOT NULL AUTO_INCREMENT,
  import_mst_id int(11) DEFAULT NULL,
  product_id int(11) DEFAULT NULL,
  quantity int(11) DEFAULT NULL,
  price decimal(19, 2) DEFAULT NULL,
  PRIMARY KEY (import_detail_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 10,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `group_permission`
--
CREATE TABLE group_permission (
  group_per_id int(11) NOT NULL AUTO_INCREMENT,
  group_id int(11) DEFAULT NULL,
  permission_id int(11) DEFAULT NULL,
  PRIMARY KEY (group_per_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 63,
AVG_ROW_LENGTH = 264,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `groups`
--
CREATE TABLE groups (
  group_id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(250) DEFAULT NULL,
  PRIMARY KEY (group_id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create table `ex_user_group`
--
CREATE TABLE ex_user_group (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) DEFAULT NULL,
  permission_id int(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 5,
AVG_ROW_LENGTH = 4096,
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
  quantity int(11) DEFAULT NULL,
  price decimal(19, 2) DEFAULT NULL,
  PRIMARY KEY (cart_id)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 4096,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

-- 
-- Dumping data for table warehouse
--
INSERT INTO warehouse VALUES
(1, 'kho chính', 'HCM'),
(2, 'kho 1', 'HN'),
(3, 'kho 2', 'LA'),
(4, 'kho 3', 'Dak Lak'),
(5, 'kho 4', 'Ca Mau');

-- 
-- Dumping data for table user_per
--
INSERT INTO user_per VALUES
(1, 1, 1, 1),
(2, 2, 2, 1),
(3, 3, 3, 1),
(4, 4, 4, 1),
(5, 5, 5, 1);

-- 
-- Dumping data for table user_group
--
INSERT INTO user_group VALUES
(1, 1, 1),
(2, NULL, NULL),
(3, NULL, NULL),
(4, NULL, NULL),
(5, NULL, NULL);

-- 
-- Dumping data for table user
--
INSERT INTO user VALUES
(1, 'admin1', '$2b$10$Z/qpCl6b6g/bneGLSQExaO57wVj/txYZLkn2.VV6Fl//yymTaa6pa', NULL, NULL, '0123456789', NULL, NULL, NULL, 1, NULL, 1, '2023-03-01'),
(2, 'admin2', '$2b$10$LNXCHquGuyzizaU3Hh7otuOeP8UXxFsNzrgBdheFbyyPb7AqHELpK', NULL, NULL, '0123456789', NULL, NULL, NULL, 1, NULL, 1, '2023-03-01'),
(3, 'user1', '$2b$10$Xc/bO.Vrtw3xdZ6SlAt7nu9Rj50ZdRqPevKvdAK0KMYpbA5K/D8ha', NULL, NULL, '0123456789', NULL, NULL, NULL, 5, NULL, 1, '2023-03-01'),
(4, 'user2', '$2b$10$DG1loTmhgldr8ii1VfA5puleu8v0mKFicEvJ0PJanDYZSRomW68va', NULL, NULL, '0123456789', NULL, NULL, NULL, 5, NULL, 1, '2023-03-01'),
(5, 'user3', '$2a$10$/4K12H7jczHV85mVS7JryOJsb1u4wabx1HKDDjolcJw9DyGk56O3W', NULL, NULL, '0123456789', NULL, NULL, NULL, 5, NULL, 1, '2023-03-01');

-- 
-- Dumping data for table suppilier
--
INSERT INTO suppilier VALUES
(1, 'Hảo Hảo', 'HN, Việt Nam', '0123456789'),
(2, '3 Miền', 'HCM, Việt Nam', '0123222223');

-- 
-- Dumping data for table product_image
--
INSERT INTO product_image VALUES
(1, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920304347.jpg'),
(2, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920311202.jpg'),
(3, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920317419.jpg'),
(4, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920321184.jpg'),
(5, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920324936.jpg'),
(6, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202202111435531681.jpg'),
(7, 1, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202211181144401243.jpg'),
(8, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-202211181138546073.jpg'),
(9, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-202202111517241801.jpg'),
(10, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512050583.jpg'),
(11, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512053684.jpg'),
(12, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512056156.jpg'),
(13, 2, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-201912091512058497.jpg'),
(14, 2, 'mi-chua-cay-3-mien-65g-thung-4-org.jpg'),
(15, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316023474.jpg'),
(16, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202202101704465651.jpg'),
(17, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316162632.jpg'),
(18, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316188274.jpg'),
(19, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316201422.jpg'),
(20, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316211419.jpg'),
(21, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316225778.jpg'),
(22, 3, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316233493.jpg'),
(23, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-201912081340008681.jpg'),
(24, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-202202120757304010.jpg'),
(25, 4, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-202210112203096587.jpg'),
(26, 4, '-202209200940563078.jpg'),
(27, 4, '-202209200940567793.jpg'),
(28, 4, '-202209200940583421.jpg'),
(29, 4, '-202209200941000082.jpg'),
(30, 4, '-202209200941004595.jpg'),
(31, 6, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338517634.jpg'),
(32, 6, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338521747.jpg'),
(33, 6, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338527050.jpg'),
(34, 6, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338529922.jpg'),
(35, 6, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338532564.jpg'),
(36, 7, 'bun-gio-heo-hang-nga-goi-75g-thung-30-3-org.jpg'),
(37, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-202202150955462652.jpg'),
(38, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-201912121045415628.jpg'),
(39, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-201912121045419341.jpg'),
(40, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-201912121045422092.jpg'),
(41, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-201912121045426875.jpg'),
(42, 7, 'thung-30-goi-bun-gio-heo-hang-nga-75g-201912121045429737.jpg'),
(43, 8, 'thung-24-lon-bia-heineken-silver-330ml-202205111635132939.jpg'),
(44, 8, 'thung-24-lon-bia-heineken-silver-330ml-202202101139462215.jpg'),
(45, 8, 'thung-24-lon-bia-heineken-silver-330ml-201903281046300671.jpg'),
(46, 8, 'thung-24-lon-bia-heineken-silver-330ml-201903281046301735.jpg'),
(47, 8, 'thung-24-lon-bia-heineken-silver-330ml-201910091038476393.jpg'),
(48, 8, 'thung-24-lon-bia-heineken-silver-330ml-201905221020252011.jpg'),
(49, 8, 'thung-24-lon-bia-heineken-silver-330ml-201903281046302976.jfif'),
(50, 0, ''),
(51, 0, ''),
(52, 0, ''),
(53, 0, ''),
(54, 0, ''),
(55, 0, '');

-- 
-- Dumping data for table product
--
INSERT INTO product VALUES
(1, 'Thùng 30 gói mì Hảo Hảo tôm chua cay 75g', 'mi-hao-hao-tom-chua-cay-75g-30', 'Sợi mì vàng dai ngon hòa quyện trong nước súp tôm chua cay Hảo Hảo, đậm đà thấm đẫm từng sợi sóng sánh cùng hương thơm quyến rũ ngất ngây. Mì Hảo Hảo tôm chua cay gói 75g là lựa chọn hấp dẫn không thể bỏ qua đặc biệt là những ngày bận rộn cần bổ sung năng lượng nhanh chóng đơn giản mà vẫn đủ chất', 118000, 'thung-30-goi-mi-hao-hao-tom-chua-cay-75g-202110110920304347.jpg', '75g / gói', 'VẮT MÌ - Bột mì (bổ sung vi chất (kẽm, sắt)), dầu thực vật (dầu cọ, chất chống oxy hoá (BHA (320), BHT (321))), tinh bột, muối, đường, nước mắm, chất điều vị (mononatri glutamat (621)), chất ổn định (pentanatri triphosphat (451(i), kali carbonat (501(i))), chất điều chỉnh độ acid (natri carbonat (500(i))), bột nghệ, chất tạo màu tự nhiên (curcumin (100(i))).', 'Cho vắt mì, gói súp và gói dầu vào tô. Chế nước sôi vào khoảng 400 ml, đậy nắp lại và chờ 3 phút. Trộn đều và dùng được ngay.', 'Để nơi khô ráo, thoáng mát tránh ánh nắng mặt trời.', 'Hảo Hảo (Việt Nam)', 'Việt Nam', 1, 100, 1, '2023-02-23', NULL),
(2, 'Thùng 30 gói mì 3 Miền tôm chua cay 65g', 'mi-chua-cay-3-mien-65g-thung', 'Sở hữu nét đậm đà chuẩn hương vị truyền thống. Mì 3 Miền tôm chua cay gói 65g có được vị chua cay từ quá trình tìm tòi cũng như chắt lọc các nét đặc trưng nhất của các món chua cay dọc 3 miền tổ quốc. Để rồi thành phẩm mang đến cho người tiêu dùng hương vị tinh tế nhất và tuyệt hảo nhất', 89000, 'thung-30-goi-mi-3-mien-tom-chua-cay-65g-202211181138546073.jpg', '65g / gói', 'VẮT MÌ - Bột mì (75,0%), shortening, phẩm màu (curcumin (E100(i)).\r\nGÓI GIA VỊ - Bột tôm (30 g/kg), dầu cọ, muối, đường, bột tỏi, bột ớt, hành lá sấy, chất điều chỉnh độ acid (citric acid (E330)), chất điều vị (monosodium L-glutamate (E621), disodium 5''-inosinate (E631), disodium 5''-guanylate (E627)).', 'Cho vắt mì và gói gia vị vào tô. Chế khoảng 350 ml nước sôi vào tô mì, đậy nắp kín và chờ trong 3 phút. Mở nắp, trộn đều và bắt đầu thưởng thức.', 'Để nơi khô ráo, thoáng mát tránh ánh nắng mặt trời.', '3 Miền (Việt Nam)', 'Việt Nam', 1, 50, 1, '2023-02-23', NULL),
(3, 'Thùng 30 gói hủ tiếu Nam Vang Cung Đình 78g', 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g', 'Hủ tiếu ăn liền là bữa ăn cực tiện lợi và thơm ngon. 30 gói hủ tiếu Nam Vang Cung Đình 78g chính hãng hủ tiếu Cung Đình hương vị Nam Vang đặc trưng thấm đều trong từng sợi hủ tiếu dai ngon đậm đà cực đã cùng mùi hương hấp dẫn lôi cuốn không thể chối từ', 288000, 'thung-30-goi-hu-tieu-nam-vang-cung-dinh-78g-202008181316023474.jpg', '78g / gói', 'Sản phẩm có 2 thành phần chính: và vắt hủ tiếu và các gói trong vị, trong đó đặc biệt có gói xốt tôm mực cực hấp dẫn, gia vị ngon đúng điệu Nam Vang. Sản phẩm cung cấp cho cơ thể carbohydrate, chất đạm và chất béo', 'Cho hủ tiếu, gia vị vào tô, chế khoảng 400ml nước sôi và đậy nắp trong 3 phút', 'Bảo quản nơi khô ráo, tránh ánh nắng mặt trời. Nên chế biến ngay khi mở bao bì. Tránh để gần hoá chất và sản phẩm có mùi mạnh.', 'Cung Đình (Việt Nam)', 'Việt Nam', 2, 50, 1, '2023-02-23', NULL),
(4, 'Thùng 30 gói mì khoai tây Omachi xốt bò hầm 80g', 'thung-mi-omachi-sot-bo-ham-goi-80g-30-goi', 'Sợi mì từ trứng và khoai tây vàng dai ngon hòa trong nước súp Omachi xốt bò hầm đậm đà cùng hương thơm nứt mũi tạo ra siêu phẩm mì với sự kết hợp hương vị hài hòa, độc đáo. 30 gói mì khoai tây Omachi xốt bò hầm 80g tiện lợi, thơm ngon hấp dẫn không thể chối từ', 252000, 'thung-30-goi-mi-khoai-tay-omachi-xot-bo-ham-80g-201912081340008681.jpg', '65g / gói', 'Vắt mì - bột mì, dầu cọ, tinh bột khoai mì, chất ổn định, tinh bột khoai tây, muối, nước mắm, chất điều vị, chiết xuất nấm men, chất tạo xốp, bột lòng đỏ trứng, hỗn hợp protein lòng trắng trứng, xiro ngô nồng độ fructose cao, chiết xuất trái dành dành, chất chống oxy hóa', 'Cho vắt mì, gói nêm, gói rau và gói dầu vào tô. Đổ vào 400ml nước sôi. Đậy nắp trong 3 phút. Mở nắp ra, trộn đều là dùng được ngay.', 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Không để gần hóa chất hoặc sản phẩm có mùi mạnh.', 'Omachi (Việt Nam)', 'Việt Nam', 1, 50, 1, '2023-02-23', NULL),
(6, 'Bánh gạo cắt lát tokpokki Matamun gói 600g', '', 'Bánh gạo dạng gói chất lượng, dai ngon từ thương hiệu bánh gạo Matamun được sản xuất tại Hàn Quốc. Bánh gạo cắt lát tokpokki Matamun 600g tiện lợi cho bạn trổ tài sáng tạo chế biến các món ăn hấp dẫn như sốt cay, sốt phô mi, nấu lẩu,...Sản phẩm cam kết chính hãng và an toàn', 56000, 'banh-gao-cat-lat-tokpokki-matamun-goi-600g-202010311338517634.jpg', '600g/gói', 'Gạo (99,1%), muối, chất điều chỉnh acid, rượu ngũ cốc.', 'Cho bánh gạo tokpokki vào trong nồi nước. Khi bắt đầu sôi điều chỉnh lửa nhỏ đun khoảng 5 phút. Sau đó cho bánh gạo ra chế biến các món ăn tùy thích.', 'Nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.', 'Matamun (Hàn Quốc)', 'Hàn Quốc', 19, 1000, 1, '2023-02-23', NULL),
(7, 'Thùng 30 gói bún giò heo Hằng Nga 75g', '', 'Sản phẩm bún ăn liền thương hiệu Hằng Nga được sản xuất từ các thành phần tự nhiên an toàn cho khỏe. 30 gói bún giò heo Hằng Nga 75g chất lượng thơm ngon với nước súp giò heo cực đậm đà và hấp dẫn cho bạn bữa ăn nhanh tiện lợi và dinh dưỡng', 260000, 'bun-gio-heo-hang-nga-goi-75g-thung-30-3-org.jpg', '75g', 'Gạo, tinh bột, muối, chất nhũ hoá, dầu tinh luyện, giả thịt (đậu nành), chất điều vị, cà rốt, hành lá, ngò, hương heo...', 'Cho bún, các gói gia vị vào tô. Thêm 400ml nước sôi, đậy nắp trong 5 phút', 'Nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời', 'Hằng Nga (Việt Nam)', 'Việt Nam', 3, 100, 1, '2023-02-23', NULL),
(8, 'Thùng 24 lon bia Heineken Silver 330ml', '44000', 'Bia thơm ngon chất lượng chính hãng thương hiệu bia được ưa chuộng tại hơn 192 quốc gia trên thế giới đến từ Hà Lan - bia Heineken. 24 lon Heineken Silver 330ml thơm ngon hương vị bia tuyệt hảo, cân bằng và êm dịu, thiết kế đẹp mắt, cho người dùng cảm giác sang trọng, nâng tầm đẳng cấp.', 440000, 'thung-24-lon-bia-heineken-silver-330ml-202205111635132939.jpg', '330ml', NULL, NULL, NULL, 'Heineken (Hà Lan)', 'Việt Nam', 17, 100, 1, '2023-02-23', NULL),
(16, 'Quýt giống Úc túi 1kg (5 - 9 trái)', 'quyt-giong-uc-tui-1kg-(5-9-trai)', 'Quýt Úc là trái cây có màu vàng ươm, quả hơi dẹp, trên vỏ quýt có các đốm tinh dầu to bóng. Quýt ngon, ngọt nhất khi trái hơi dẹt, cuống còn tươi, màu sáng đều. Quýt Úc tại Bách hóa XANH được trồng tại Trung Quốc chất lượng, tươi ngon', 640000, 'register.png', '1kg', 'Quýt Úc được trồng tại Trung Quốc, đảm bảo nguồn gốc rõ ràng.', 'Để chọn quýt ngon, nên chọn những quả có cuống còn tươi, hơi dẹt, không bị dập, úng.', 'Lưu ý: Sản phẩm nhận được có thể khác với hình ảnh về màu sắc và số lượng nhưng vẫn đảm bảo về mặt khối lượng và chất lượng', 'Quýt Úc', ' Trung Quốc', 14, 0, 1, '2023-03-01', '2024-01-01');

-- 
-- Dumping data for table permission
--
INSERT INTO permission VALUES
(1, 'view user myself', 'user/myself'),
(2, 'edit user myself', 'user/myself/edit'),
(3, 'delete user myself', 'user/myself/delete'),
(4, 'view all user', 'user/list'),
(5, 'edit all user', 'user/edit'),
(6, 'delete all user', 'user/delete'),
(7, 'view orders myself', 'user/order/list'),
(8, 'create orders myself', 'user/order'),
(9, 'edit orders myself', 'user/order/edit'),
(10, 'delete orders myself', 'user/order/delete'),
(11, 'view product', 'product/list'),
(12, 'create product', 'product'),
(13, 'edit product', 'product/edit'),
(14, 'delete product', 'product/delete'),
(15, 'view suppilier', 'suppilier/list'),
(16, 'create suppilier', 'suppilier'),
(17, 'edit suppilier', 'suppilier/edit'),
(18, 'delete suppilier', 'suppilier/delete'),
(19, 'view category', 'category/list'),
(20, 'create category', 'category'),
(21, 'edit category', 'category/edit'),
(22, 'delete category', 'category/delete'),
(23, 'view warehouse', 'warehouse/list'),
(24, 'create warehouse', 'warehouse'),
(25, 'edit warehouse', 'warehouse/warehouse'),
(26, 'delete warehouse', 'warehouse/delete'),
(27, 'view group', 'group/list'),
(28, 'create group', 'group'),
(29, 'edit group', 'group/edit'),
(30, 'delete group', 'group/delete'),
(31, 'view cart myself', 'user/cart/list'),
(32, 'create cart myself ', 'user/cart'),
(33, 'edit cart myself', 'user/cart/edit'),
(34, 'delete cart myself', 'user/cart/delete'),
(35, 'view all orders', 'order/list'),
(36, 'create all orders', 'order'),
(37, 'edit all orders', 'order/edit'),
(38, 'delete all orders', 'order/delete');

-- 
-- Dumping data for table order_detail
--
-- Table sieuthi_mini.order_detail does not contain any data (it is empty)

-- 
-- Dumping data for table orders
--
-- Table sieuthi_mini.orders does not contain any data (it is empty)

-- 
-- Dumping data for table in_user_permission
--
-- Table sieuthi_mini.in_user_permission does not contain any data (it is empty)

-- 
-- Dumping data for table import_mst
--
INSERT INTO import_mst VALUES
(1, '2023-02-25', 1, 1),
(2, '2023-02-25', 2, 2),
(3, '2023-02-25', 1, 3),
(4, '2023-02-27', 1, 1),
(5, '2023-02-27', NULL, 1),
(6, '2023-02-27', 1, 1),
(7, '2023-02-27', 1, 1);

-- 
-- Dumping data for table import_detail
--
INSERT INTO import_detail VALUES
(1, 1, 1, 100, NULL),
(2, 2, 1, 200, NULL),
(3, 1, 2, 40, NULL),
(4, 4, 10, 100, NULL),
(5, 4, 9, 4, NULL),
(6, 5, 1, 1, NULL),
(7, 6, 1, 1, NULL),
(8, 7, 1, 1, NULL),
(9, 7, 2, 10, NULL);

-- 
-- Dumping data for table group_permission
--
INSERT INTO group_permission VALUES
(1, 5, 1),
(2, 5, 2),
(3, 5, 3),
(4, 5, 7),
(5, 5, 8),
(6, 5, 9),
(7, 5, 15),
(8, 5, 19),
(9, 5, 31),
(10, 5, 33),
(11, 5, 34),
(12, 1, 1),
(13, 1, 2),
(14, 1, 3),
(15, 1, 4),
(16, 1, 5),
(17, 1, 6),
(18, 1, 7),
(19, 1, 8),
(20, 1, 9),
(21, 1, 10),
(22, 1, 11),
(23, 1, 12),
(24, 1, 13),
(25, 1, 14),
(26, 1, 15),
(27, 1, 16),
(28, 1, 17),
(29, 1, 18),
(30, 1, 19),
(31, 1, 20),
(32, 1, 21),
(33, 1, 22),
(34, 1, 23),
(35, 1, 24),
(36, 1, 25),
(37, 1, 26),
(38, 1, 27),
(39, 1, 28),
(40, 1, 29),
(41, 1, 30),
(42, 1, 31),
(43, 1, 32),
(44, 1, 33),
(45, 1, 34),
(46, 1, 35),
(47, 1, 36),
(48, 1, 37),
(49, 1, 38),
(50, NULL, NULL),
(51, NULL, NULL),
(52, NULL, NULL),
(53, NULL, NULL),
(54, NULL, NULL),
(55, NULL, NULL),
(56, NULL, NULL),
(57, NULL, NULL),
(58, NULL, NULL),
(59, NULL, NULL),
(60, NULL, NULL),
(61, NULL, NULL),
(62, NULL, NULL);

-- 
-- Dumping data for table groups
--
INSERT INTO groups VALUES
(1, 'admin'),
(2, 'manage'),
(3, 'cashier'),
(4, 'seller'),
(5, 'customer');

-- 
-- Dumping data for table ex_user_group
--
INSERT INTO ex_user_group VALUES
(1, 1, 1),
(2, NULL, NULL),
(3, NULL, NULL),
(4, NULL, NULL);

-- 
-- Dumping data for table category_product
--
INSERT INTO category_product VALUES
(1, 'Mì ăn liền', 'mi'),
(2, 'Hủ tiếu, miến, bánh canh', 'hu-tieu'),
(3, 'Phở, bún ăn liền', 'pho-bun'),
(4, 'Hạt nêm, bột ngọt, bột canh', 'hat-nem'),
(5, 'Nước chấm, mắm', 'sot-nuoc-cham'),
(6, 'Gia vị nêm sẵn', 'gia-vi-nem-san'),
(7, 'Gạo các loại', 'cac-loai-gao'),
(8, 'Xúc xích, lạp xưởng', 'xuc-xich-lap-xuong'),
(9, 'Đồ chay các loại', 'do-chay-cac-loai'),
(10, 'Đồ hộp các loại', 'do-dong-hop'),
(11, 'Rong biển, bánh tráng, đậu', 'do-kho'),
(12, 'Rau lá', 'rau-sach'),
(13, 'Củ, quả', 'cu-qua'),
(14, 'Trái cây', 'trai-cay'),
(15, 'Thịt các loại', 'thit-cac-loai'),
(16, 'Cá, hải sản', 'ca-tom-muc-ech'),
(17, 'Bia', 'bia'),
(18, 'Nước ngọt', 'nuoc-ngot'),
(19, 'Bánh Snake', 'banh');

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