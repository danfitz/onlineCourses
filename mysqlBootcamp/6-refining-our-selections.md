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

## LIKE

