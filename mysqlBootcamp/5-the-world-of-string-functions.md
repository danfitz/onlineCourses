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
-- In MySQL, strings 
SELECT SUBSTRING('Hello World', 1, 4);
```