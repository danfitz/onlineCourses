---
title: "The World of String Functions"
part: 5
date: "2020-01-15"
categories: [backend]
tags: [sql]
source: [udemy]
---

# The World of String Functions

So far we've only added or removed data. Sometimes we might want to perform **operations** on that data. For example, maybe I want to concatenate `first_name` and `last_name`.

This section will deal with **string functions** specifically. All of MySQL's string functions can be found [here](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html).

But here's the most *popular* string functions you'll use 99% of the time:

**Pro tip**: All of the below string functions can be *combined* by nesting one inside another.

## CONCAT

Use `CONCAT` alongside a command like `SELECT` to **combine strings together**.

```sql
-- Returns a new table with a column containing '<first_name> <last_name>' for each row
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM table;
```

**Note**: We provide an *alias* because the new table will default to an ugly header titled `CONCAT(first_name, ' ', last_name)`.

**Pro tip**: `CONCAT_WS` is a shortcut variant that adds a separator *between* every column value. So `CONCAT_WS(' - ', first_name, last_name, age)` will return the string `'<first_name> - <last_name> - <age>'`.


## SUBSTRING

Use `SUBSTRING` to **select portions** of a string, e.g., the last 3 characters.

```sql
-- In MySQL, strings are one-indexed, so they start at 1
SELECT SUBSTRING('Hello World', 1, 4); -- Grabs 4 characters starting from the 1st
SELECT SUBSTRING('Hello World', 2); -- Grabs EVERY character starting from the 2nd
SELECT SUBSTRING('Hello World', -3); -- Grabs every character starting from 3rd last
```

## REPLACE

Use `REPLACE` to replace a portion of a string with another string value.

```sql
SELECT REPLACE('Hello World', 'Hell', '!@#$'); -- Becomes '!@#$o World'
SELECT REPLACE('HellO World', 'o', 'x'); -- Becomes 'HellO Wxrld' b/c it's case sensitive
```

## REVERSE

Use `REVERSE` to literally just **reverse** a string from, say, `'Hello World'` to `'dlroW olleH'`.

```sql
SELECT REVERSE(title) FROM books; -- returns reverse of all titles
```

## CHAR_LENGTH

Use `CHAR_LENGTH` to tell you **how many** characters are in a given string.

```sql
-- Returns text with describing character length of author last names
SELECT
  CONCAT(author_lname, ' is ', CHAR_LENGTH(author_lname), ' characters long') AS 'description'
FROM books;
```

## UPPER and LOWER

Use `UPPER` and `LOWER` to change the case of a string.

```sql
SELECT UPPER('Hello World'); -- returns 'HELLO WORLD'
SELECT LOWER('Hello World'); -- returns 'hello world'
```

