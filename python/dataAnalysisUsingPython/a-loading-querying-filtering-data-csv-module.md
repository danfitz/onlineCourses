---
title: 'Loading, Querying, and Filtering Data using the csv Module'
part: 1
date: '2022-02-22'
categories: [data science]
tags: [python]
source: [coursera]
---

# Loading, Querying, and Filtering Data using the csv Module

## Reading CSV files

We can read a CSV file using the built-in `csv` module.

```py
import csv

rows = []

f = open('file.csv')
reader = csv.DictReader(f)
print(reader.fieldnames) # shows all available fields

for row in reader:
  rows.append(row)
 
f.close()

# Now you can access your row data in `rows`
```

**Note**: You can only iterate through a `reader` once.

## List Comprehensions

**List comprehensions** are expressions that allow you to create new lists out of existing lists using a mix of filter conditions and mapping conditions.

```py
people = [{ "name": "Dan", "age": 29 }, { "name": "John", "age": 30 }]
ages_below_30 = [person["age"] for person in people if person["age"] < 30]
```

The basic syntax is something like...

```py
[<mapping> for item in list if <filter>]
```

## Lambda functions

A **lambda** is a function expression: basically, a way to create functions inline.

```py
fn1 = lambda x: x + 2
```

Lambdas are especially useful if some function accepts a function as an argument. Common examples include `sorted`, `min`, and `max`

```py
people = [{ "name": "Dan", "age": 29 }, { "name": "John", "age": 30 }]
oldest_person = max(people, key = lambda x: x["age"])
```
