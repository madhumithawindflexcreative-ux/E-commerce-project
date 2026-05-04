CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price INT,
  originalPrice INT,
  rating INT,
  image VARCHAR(255),
  category VARCHAR(100)
);

INSERT INTO products (name, price, originalPrice, rating, image, category)
VALUES
('Laptop',50000,65000,4,'laptop.jpg','Electronics'),
('Smartphone',20000,25000,4,'phone.jpg','Mobiles'),
('Headphones',2000,3000,3,'headphone.jpg','Electronics'),
('Smartwatch',5000,8000,4,'watch.jpg','Electronics'),
('Tablet',15000,20000,4,'tablet.jpg','Mobiles');

select * from products;

UPDATE products 
SET category = 'Electronics'
WHERE name = 'Book';



CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);

ALTER TABLE users ADD role VARCHAR(20) DEFAULT 'user';
UPDATE users SET role='admin' WHERE id=1;
SELECT * FROM users;




CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(100),
  product_name VARCHAR(100),
  price INT,
  quantity INT
);

select * from orders;

ALTER TABLE products ADD showInHome BOOLEAN DEFAULT FALSE;

SELECT name, showInHome FROM products;

SELECT id, name, showInHome FROM products;

UPDATE products SET showInHome = 1 WHERE id = 11;

ALTER TABLE products ADD images TEXT;


CREATE TABLE product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  image VARCHAR(255)
);

SELECT * FROM products;


INSERT INTO product_images (product_id,image)
VALUES (1,'laptop1.jpg');

INSERT INTO product_images (product_id,image)
VALUES (1,'laptop2.jpg');

INSERT INTO product_images (product_id,image)
VALUES (1,'laptop3.jpg');

INSERT INTO product_images (product_id,image)
VALUES (1,'laptop4.jpg');

SELECT * FROM products;

SELECT * FROM product_images;
