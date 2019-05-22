DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL (5,2) default 0,
    stock_quantity INT default 1,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (45) NOT NULL,
    over_head_costs DECIMAL (5,2) default 0,
    PRIMARY KEY (department_id)
);

ALTER TABLE products ADD product_sales DECIMAL (5,2);