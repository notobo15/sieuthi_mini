CREATE TABLE
    cart (
        cart_id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) DEFAULT NULL,
        product_id int(11) DEFAULT NULL,
        quatity int(11) DEFAULT NULL,
        createAt date DEFAULT curdate(),
        PRIMARY KEY (cart_id)
    )
CREATE TABLE
    sieuthi_mini.category_product (
        catefory_id int(11) NOT NULL AUTO_INCREMENT,
        product_id int(11) NOT NULL,
        name varchar(200) NOT NULL,
        name_code varchar(200) NOT NULL,
        PRIMARY KEY (catefory_id)
    )
CREATE TABLE
    `order` (
        order_id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) DEFAULT NULL,
        order_date date DEFAULT curdate(),
        status varchar(255) DEFAULT NULL,
        createAt date DEFAULT curdate(),
        PRIMARY KEY (order_id)
    )
CREATE TABLE
    order_detail (
        order_det_id int(11) NOT NULL AUTO_INCREMENT,
        order_id int(11) DEFAULT NULL,
        product_id int(11) DEFAULT NULL,
        price decimal(19, 2) DEFAULT NULL,
        quantity int(11) DEFAULT NULL,
        PRIMARY KEY (order_det_id)
    )
CREATE TABLE
    sieuthi_mini.product (
        product_id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(300) NOT NULL,
        name_code varchar(255) DEFAULT NULL,
        description text NOT NULL,
        price double NOT NULL,
        mass varchar(200) NOT NULL,
        ingredient text NOT NULL,
        how_to_use text DEFAULT NULL,
        preserve text DEFAULT NULL,
        trademark varchar(200) DEFAULT NULL,
        make_in varchar(200) DEFAULT NULL,
        cate_id int(11) NOT NULL,
        suppilier_id int(11) NOT NULL,
        quantity int(11) NOT NULL,
        status tinyint(4) NOT NULL,
        createAt date NOT NULL,
        modifiedAt date NOT NULL,
        PRIMARY KEY (product_id)
    )
CREATE TABLE
    product_image (
        prod_img_id int(11) NOT NULL AUTO_INCREMENT,
        product_id int(11) NOT NULL,
        image_name varchar(300) NOT NULL,
        PRIMARY KEY (prod_img_id)
    )
CREATE TABLE
    sieuthi_mini.user (
        user_id int(11) NOT NULL AUTO_INCREMENT,
        user_name varchar(255) DEFAULT NULL,
        password varchar(255) DEFAULT NULL,
        first_name varchar(255) DEFAULT NULL,
        last_name varchar(255) DEFAULT NULL,
        phone varchar(20) DEFAULT NULL,
        birth_date date DEFAULT NULL,
        address varchar(255) DEFAULT NULL,
        gender varchar(10) DEFAULT NULL,
        delivery_address varchar(255) DEFAULT NULL,
        status tinyint(1) DEFAULT 1,
        `position` varchar(255) DEFAULT NULL,
        createAt date DEFAULT curdate(),
        PRIMARY KEY (user_id)
    )
CREATE TABLE
    sieuthi_mini.permistion (
        per_id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(200) NOT NULL DEFAULT '',
        PRIMARY KEY (per_id, name)
    )
CREATE TABLE
    sieuthi_mini.user_per (
        user_per_id int(11) NOT NULL AUTO_INCREMENT,
        user_id int(11) DEFAULT NULL,
        per_id int(11) DEFAULT NULL,
        status tinyint(1) DEFAULT 1,
        PRIMARY KEY (user_per_id)
    )
CREATE TABLE
    sieuthi_mini.permission_detail (
        per_det_id int(11) NOT NULL AUTO_INCREMENT,
        per_idi int(11) DEFAULT NULL,
        action_name varchar(255) DEFAULT NULL,
        action_code varchar(255) DEFAULT NULL,
        action_status boolean DEFAULT '1',
        PRIMARY KEY (per_det_id)
    )