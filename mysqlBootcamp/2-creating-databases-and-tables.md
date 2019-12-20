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

## Basic Table Commands

