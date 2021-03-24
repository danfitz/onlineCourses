-- 1. Create shirts_db database
CREATE DATABASE shirts_db;
use shirts_db;

-- 2. Create shirts table with schema:
-- shirt_id NOT NULL PRIMARY KEY
-- article TEXT
-- color TEXT
-- shirt_size TEXT
-- last_worn INT
CREATE TABLE shirts (
  shirt_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  article VARCHAR(100),
  color VARCHAR(100),
  shirt_size VARCHAR(100),
  last_worn INT
);
DESC shirts;

-- 3. Insert data into table
INSERT INTO shirts (article, color, shirt_size, last_worn) VALUES
  ('t-shirt', 'white', 'S', 10),
  ('t-shirt', 'green', 'S', 200),
  ('polo shirt', 'black', 'M', 10),
  ('tank top', 'blue', 'S', 50),
  ('t-shirt', 'pink', 'S', 0),
  ('polo shirt', 'red', 'M', 5),
  ('tank top', 'white', 'S', 200),
  ('tank top', 'blue', 'M', 15);

-- 4. Insert a new shirt
INSERT INTO shirts (article, color, shirt_size, last_worn)
  VALUES ('polo shirt', 'purple', 'M', 50);

-- 5. Select all shirts (but only article and color columns)
SELECT article, color FROM shirts;

-- 6. Select all medium shirts (and display all columns EXCEPT shirt_id)
SELECT article, color, shirt_size, last_worn FROM shirts WHERE shirt_size='M';

-- 7. Update all polo shirts to size L
SELECT * FROM shirts WHERE article='polo shirt';
UPDATE shirts SET shirt_size='L' WHERE article='polo shirt';

-- 8. Update shirt worn 15 days ago to 0 days
SELECT * FROM shirts WHERE last_worn=15;
UPDATE shirts SET last_worn=0 WHERE last_worn=15;

-- 9. In one line, update all white shirts to size XS and color off white
SELECT * FROM shirts WHERE color='white';
UPDATE shirts SET shirt_size='XS', color='off white' WHERE color='white';

-- 10. Delete all shirts worn 200 days ago
SELECT * FROM shirts WHERE last_worn=200;
DELETE FROM shirts WHERE last_worn=200;

-- 11. Delete all tank tops
SELECT * FROM shirts WHERE article='tank top';
DELETE FROM shirts WHERE article='tank top';

-- 12. Delete ALL shirts
DELETE FROM shirts;

-- 13. Drop entire shirts table
DROP TABLE shirts;