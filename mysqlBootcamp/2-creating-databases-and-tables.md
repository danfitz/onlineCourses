---
title: 'Creating Databases and Tables'
part: 2
date: '2019-12-15'
categories: [backend]
tags: [sql]
source: [udemy]
---

# Creating Databases and Tables

## Basic Database Commands

With MySQL set up, you can begin using it in the terminal by running `mysql-ctl cli`. Inside there, you can:

* View all the databases in your database server: `show databases;`
* Create a new database: `CREATE DATABASE <name>;`
* Delete a database: `DROP DATABASE <name>;`
* *Select* a database that you will be working with: `USE <name>;` (you can verify the selected database using `SELECT database();`)

**Note**: All SQL commands must end with a `;`. It's what indicates that your command is *done* and should *run*. Otherwise, the parser will just hang there and not complete the command.

## Tables

A database is *just* a bunch of **tables**.

### Data types

MySQL *requires* you to define each column's **data type**: the kind of data it expects and will allow.

The 2 most common data types you'll work with are:
* `INT`
* `VARCHAR`

`INT` holds a whole number (no decimals) with a *max value* of **4294967295**.

**Note**: Technically, `INT` defaults to `INT SIGNED`, which means a numeric range between -2147483648 and 2147483647. If you expect to only have positive numbers and need a higher upper range, you can use `INT UNSIGNED`, which shifts the numeric range to between 0 and 4294967295. (This means the same memory usage.)

`VARCHAR` holds variable-length strings (`CHAR` is fixed length) with a *max length* of **between 1 and 255** characters. However, even though the limit is 255 characters, you can specify a **custom limit** via `VARCHAR(100)`.

**Note**: If you insert a string longer than the `VARCHAR` limit, it will only store the characters *up to* the limit.

### Creating tables

With your database already selected via `USE databasename;`, here's the basic syntax for creating a table, its columns, and the column's data types:

```sql
CREATE TABLE tablename
  (
    column1 data_type,
    column2 data_type
  );
```

**Note**: A common convention is to **pluralize** your table names because tables carry *multiple* instances of data.

To verify that the table was successfully created with the correct column data types, there are 3 commands we can use:

1. `SHOW TABLES;` lists all tables in the database
2. `SHOW COLUMNS FROM <tablename>;` displays information about the columns for the table
3. `DESC <tablename>;` describes that same information!

### Deleting tables

Simply run `DROP TABLE <tablename>;`.