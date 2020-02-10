---
title: "Refining Our Selections"
part: 6
date: "2020-02-04"
categories: [backend]
tags: [sql]
source: [udemy]
---

# Refining Our Selections

In this section, we'll learn things like how to limit number of results you get back and how to sort those results.

## DISTINCT

If our `SELECT` query has duplicate values, we can qualify it as `SELECT DISTINCT` to tell SQL to only return unique values.

```sql
SELECT DISTINCT author_fname, author_lname FROM books; -- note that multiple columns tells SQL that all columns TOGETHER must be distinct
SELECT DISTINCT CONCAT(author_fname, ' ', author_lname) AS 'name' FROM books; -- you can also do it this way!
```

## ORDER BY

When you want to order your results, you can use `ORDER BY` at the end of your `SELECT` statements.

```sql
SELECT name FROM employees ORDER BY name; -- Sorts alphanumerically in ASCENDING (ASC) order
SELECT name FROM employees ORDER BY name desc; -- Sorts alphanumerically in DESCENDING (DESC) order
SELECT name FROM employees ORDER BY hire_date; -- NOTE: You can sort by columns that you DIDN'T select
SELECT name, employee_id, hire_date ORDER BY 2; -- NOTE: This is shorthand for the 2nd selection, employee_id
```

**Pro tip**: You can perform a **multiple sort**, where your query sorts by the 1st column first. Then it sorts any duplicates by the 2nd column.

```sql
-- If author_lname sorts [Frieda Harris, Dan Harris], then the second sort of author_fname will sort it as [Dan Harris, Frieda Harris]
SELECT author_fname, author_lname FROM books ORDER BY author_lname, author_fname;
```

## LIMIT

`LIMIT`, when used in conjunction with `ORDER BY`, gives you back a subset of data.

```sql
SELECT * FROM books ORDER BY released_year DESC LIMIT 10; -- returns 10 newest books
```

When you want to define *where* your limit point *starts*, you write `LIMIT <starting_index>,<number_of_items>`.
  * **Note**: The starting index is *zero-indexed*.

```sql
SELECT * FROM books ORDER BY released_year DESC LIMIT 0,10; -- returns 10 newest books
SELECT * FROM books ORDER BY released_year DESC LIMIT 10,10; -- returns 11th-20th newest books
SELECT * FROM books ORDER BY released_year DESC LIMIT 20,10; -- returns 21st-30th newest books
```

**Pro tip**: Using `LIMIT` with a starting index is great for things like pagination!

**Pro tip**: When you want to select from a certain index *all the way to the end of the table*, provide a gigantic number:

`LIMIT 5,99999999999999999999`

## LIKE

`LIKE` allows you to set conditions in `WHERE` that search for **open-ended patterns** rather than strict equality.

```sql
SELECT * FROM books WHERE released_year LIKE '19__'; -- returns books released in the 1900s
SELECT * FROM books WHERE author_lname LIKE 'Mc%'; -- returns books with author last names beginning with Mc
SELECT * FROM books WHERE title LIKE '%\%%'; -- returns books with % symbol somewhere in title
```

`_` is a wildcard representing exactly 1 character. `%` is a wildcard representing an indefinite number of characters (including zero).

**Note**: `LIKE` is case *insensitive*, so in the example above, `Mc%` and `mc%` both work.

**Pro tip**: Any search functionality usually employs `LIKE` on some level.