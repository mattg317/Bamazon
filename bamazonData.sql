SHOW databases

USE x0b2jmtssyuutb5d


CREATE TABLE Product(
	
    primary key(ItemID),
	ItemID INTEGER AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(100),
    DepartmentName VARCHAR(100),
    Price INT,
    StockQuantity INT
    )

ALTER TABLE Product MODIFY Price float(5) NOT NULL
ALTER TABLE Product MODIFY StockQuantity FLOAT(5) NOT NULL
    
SELECT * FROM Product
WHERE ProductName= "Dog Food";

SELECT * FROM Product
WHERE ItemID = 4

SELECT ItemID  FROM Product
WHERE ProductName= "Soda";

UPDATE Product SET StockQuantity=86 WHERE ItemId=5;

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Lysol", "Cleaning", "8", "100")

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Legos", "Toys", 12.99, 40)

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Chips", "Food", 3.47, 200);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Soda", "Drinks", 1.99, 100);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Dog Food", "Pets", 45.00, 50);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Paper Towels", "Cleaning", 3.00, 80);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Speakers", "Electronics", 50.77, 10);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Playstation", "Electronics", 399.99, 50);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Tennis Balls", "Sports", 4.00, 58);

INSERT INTO Product(ProductName, DepartmentName, Price, StockQuantity) VALUES ("Paper", "Office Supplies", 3.50, 15);
