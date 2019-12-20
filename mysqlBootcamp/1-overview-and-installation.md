---
title: 'Overview and Installation'
part: 1
date: '2019-12-15'
categories: [backend]
tags: [sql]
source: [udemy]
---

# Overview and Installation

## What is a Database?

The first definition of a database is that it's a **collection of data**. This means a filing cabinet, rolodex, and phone book are kinds of databases (though archaic).

However, the problem with things like phone books is that it's hard to query data in different ways. With a phone book, for example, you can only query by last name. You can't query by first name, by area code, by length of last name, etc.

This leads to the second definition of a database: it must have a **method for accessing and manipulating data**. 

Combined, the definition of a database is **a structured set of *computerized* data with an accessible *interface***.

## SQL vs. MySQL

The difference between SQL and MySQL is the difference between a **database** and a **database management system**. With a management system, you're given an **interface** for interacting with your data. It's the middle-man between your application and your database: you talk to the DBMS, and the DBMS talks to database for you.

**Note**:
* There is actually a written **SQL standard** that all DBMS's try to adhere to.
* One DBMS differs from another because of its *features* like security, user permissions, speed, download size, etc.

## Setting up MySQL