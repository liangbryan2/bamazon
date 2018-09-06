DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50),
department_name VARCHAR(50),
price FLOAT,
stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Play-Doh 10-pack", "Toys", 7.99, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("UNO Card Game", "Toys", 5.99, 2200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Fire TV Stick", "Electronics", 39.99, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Spider-Man PS4", "Video Games", 59.98, 900);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("The Very Hungry Caterpillar", "Books", 6.56, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Nintendo Switch", "Video Games", 299.00, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Adidas Shower Slide Sandal", "Clothing", 35.60, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Tile Sport 2-pack", "Cell Phones & Accessories", 49.99, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Timex Alarm Clock", "Home", 10.71, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Goodthreads Men's 5-pack Patterned Socks", "Clothing", 15.00, 100);