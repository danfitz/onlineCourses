---
title: "CRUD Commands"
part: 4
date: "2020-01-13"
categories: [backend]
tags: [sql]
source: [udemy]
---

# CRUD Commands

**CRUD** is an acronym for the different types of interactions you have with a database:
* Create
* Read
* Update
* Delete

You've already seen **create** and a bit of **read**:

```sql
-- Create
INSERT INTO <tablename>(col1, col2) VALUES('value1', 2);

-- Read (BUT there's way more to it)
SELECT * from <tablename>;
```

This section will focus on reading via `SELECT`, updating via `UPDATE`, and deleting via `DELETE`.

## SELECT (Read)

Here's the basic syntax for selecting *all data* with restrictions on what columns you want back:

```sql
SELECT * from cats; -- ALL columns
SELECT name from cats; -- one column
SELECT name, age from cats; -- multiple columns
```

### Adding conditions using WHERE

When reading a database, you're almost never reading *every* row. You usually are trying to pull out *particular* pieces. That's where the `WHERE` clause comes in.

Here's the basic syntax for `WHERE`:

```sql
SELECT * FROM cats WHERE age=4;
SELECT * FROM cats WHERE name='eGg'; -- <= case insensitive
```

**Note**: The `WHERE` clause is useful for `UPDATE` and `DELETE` too, not just `SELECT`. (You usually want to update or delete specific things, not your *entire* database/table.)

### Aliases

When displaying a table's columns, I can specify an **alias** that changes how it appears (without changing the database).

Syntax:

```sql
SELECT id AS cat_id, name AS 'cat name' FROM cats;
-- Notice that you can provide a string as alias
```

**Pro tip**: Aliases are useful when you create `JOIN` tables. For example, if you have a `dogs` table and `cats` table, they may both have the column `name`. During your `JOIN`, you can create aliases to make it clear which is which, i.e., `dog_name` and `cat_name`.

## UPDATE

Sometimes you need to `UPDATE` values in a database. For example, maybe a user forgot their password and wants to change it. Here's the syntax for that:

```sql
-- This command updates breed to 'Shorthair' for every cat with the breed 'Tabby'
UPDATE cats SET breed='Shorthair' WHERE breed='Tabby';
```

**Pro tip**: Run the `SELECT` equivalent of your `UPDATE` command first. Once your `SELECT` command returns the data you expect, *then* update it. Example:

```sql
SELECT * FROM cats WHERE name='no name provided';

-- Check if the data returned is what you want to update, then...

UPDATE cats SET name='Cat Doe' WHERE name='no name provided';
```

## DELETE

The basic syntax for the `DELETE` command is this:

```sql
SELECT * FROM cats WHERE name='Ringo';

-- Once your `SELECT` returns what you want, then...

DELETE FROM cats WHERE name='Ringo';
```

## Running SQL Files

**Bonus!**

You can run a series of SQL commands by running `source filename.sql` inside of `mysql-ctl cli` (provided you're in the same directory as `filename.sql`).

This is a quick way of executing a bunch of commands at once after having written it in a nice text editor.