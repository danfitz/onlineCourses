---
title: 'Inserting Data'
part: 3
date: '2019-12-23'
categories: [backend]
tags: [sql]
source: [udemy]
---

# Inserting Data

Here's the basic syntax for inserting data into a table:

```sql
INSERT INTO tablename(name, age)
VALUES ('Dan', 27);
```

**Note**: You can `INSERT` *multiple* data points by just providing more value sets:

```sql
INSERT INTO tablename(name, age)
VALUES ('Dan', 27),
      ('John', 28),
      ('Mary', 5);
```

## Insert Warnings

If you insert data in ways that the data type doesn't accept, it will throw a warning that you can view via `SHOW WARNINGS;`.

Here's some classic warnings:

* If you surpass your `VARCHAR(X)` character limit, by default SQL will truncate your string to the limit.
* If you surpass your `INT` limit, by default SQL will record the limit as the value.
* If you provide a string in place of an `INT`, SQL will default to 0.

## NULL and NOT_NULL

