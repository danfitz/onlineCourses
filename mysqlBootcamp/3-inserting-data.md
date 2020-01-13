---
title: "Inserting Data"
part: 3
date: "2019-12-23"
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

- If you surpass your `VARCHAR(X)` character limit, by default SQL will truncate your string to the limit.
- If you surpass your `INT` limit, by default SQL will record the limit as the value.
- If you provide a string in place of an `INT`, SQL will default to 0.

## NULL and NOT NULL

**NULL** is a value that means **I don't know what this is** or **there is no specified value**.

By default, all columns in a table *permit* empty values, which become **NULL** if nothing is passed in during the creation of a row. For example, the following table has 2 columns--`name` and `age`--but we only provide a value for `name`:

```sql
INSERT INTO cats(name) VALUES('Alabama');
-- `age` defaults to the value NULL because no value was provided
```

In order to *require* that all columns be populated, you need to provide a `NOT NULL` parameter in your table creation:

```sql
CREATE TABLE cats2 (
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL
);
```

**Note**: When you don't specify a column value, MySQL falls on a **default value**. For `VARCHAR`, that is an **empty string**. For `INT`, that is `0`. The next section will discuss setting your *own* default values.

## Setting Default Values

To set default values, use this command structure:

```sql
CREATE TABLE cats3 (
  name VARCHAR(100) DEFAULT 'no name provided',
  age INT DEFAULT 99
);
```

**Note**: You still need to set `NOT NULL` if you want to disallow `NULL` values. Without it, `NULL` values can still be explicitly inserted into your table, which you may not want.

## A Primer on Primary Keys

A **primary key** is a column guaranteed to be *unique* in a table. This make it possible to distinctly identify an item in a table from every other item--especially when they may have identical values in other columns.

```sql
CREATE TABLE unique_cats (
  cat_id INT NOT NULL, -- define column
  PRIMARY KEY (cat_id) -- assign column as primary key!
  
  -- OR

  cat_id INT NOT NULL PRIMARY KEY -- you can also do it on the same line
);

INSERT INTO unique_cats(cat_id, name) VALUES(1, 'Garfield');
```

**Note**: Sometimes you don't want to have to explicitly define your primary key. You want MySQL to do it for you. Just add the following flag:

```sql
CREATE TABLE unique_cats (
  cat_id INT NOT NULL AUTO_INCREMENT, -- THERE IS YOUR FLAG!
  ...
);
```