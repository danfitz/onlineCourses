---
title: 'Course Introduction, Intro to Programming and The Python Language, Variables, Conditionals, Jupyter Notebook, and IDLE'
part: 1
date: '2022-01-31'
categories: []
tags: [python]
source: [coursera]
---

# Course Introduction, Intro to Programming and The Python Language, Variables, Conditionals, Jupyter Notebook, and IDLE

Characteristics of Python:

* High-level language (i.e., more abstracted from lower-level details of the computer)
* OOP language
* Interpreted language (i.e., does not need to be compiled from one language to another)
  * One side effect of being interpreted is that the lack of compilation to another language can mean less automatic error checking, so more onus on you to ensure code is bug-free
* Open source

Common use cases of Python:

* AI (e.g., NLP or machine learning)
* Web dev
* Data analysis & visualization
* Desktop GUIs
* Game dev

## Print command

`print` has a few useful arguments called `end` and `sep`.

`end` allows you to specify how the string should end when printed (default is `\n`):

```py
print('Hello,', end = ' ')
print('Dan')
# Prints "Hello, Dan"
```

`sep` defines if there is a character between string arguments (default is empty string or single space):

```py
print('Hello', 'Dan', sep = ', ')
# Prints "Hello, Dan"
```

## Basic data types

* `int` is a mathematical integer
* `float` is a number with a decimal point

**Note**: The `type` function can very quickly tell you what data type a value is.

## Arithmetic operators

Operators are the same with a few unique exceptions:

* Addition `+`
* Subtraction `-`
* Multiplication `*`
* Division `/`
* Integer division `//`
  * Returns the number of full divisions, discarding the fractional part of the result
* Exponentiation `**`
* Modulus `%`


## Booleans

Boolean values are `True` and `False`.

Comparison operators are the same:

* Equal `==`
* Not equal `!=` `<>`
* Less than and greater than `<` `>`
* Less than or equal as well as greater than or equal `<=` `>=`

Boolean operators are:
* `and`
* `or`
* `not`

**Note**: All objects can be casted to a boolean via the `bool` function.

## Strings

When concatenating strings, Python requires that the inputs are all strings, so it doesn't automatically cast the values to strings for you.

```py
# This doesn't work
"4 / 3 = " + (4 / 3)
```

**Note**: An alternative way of combining strings is using the `str.format` method. (See docs for more details.)

## Casting

Here are some useful casting functions to convert data types into other data types:

* `bool`
* `int`
* `str`

## Python scripts

Also called a **module**.

## Variables

All variables are re-assignable (not immutable):

```py
x = 1
x = 2
print(x) # 2
```

Syntactic sugar for doing arithmetic at the same time as a re-assignment are:

* `+=`
* `-=`
* `*=`

To dynamically set a variable using a user's input in a CLI, you have the `input` function:

```py
const name = input("What is your name? ")
```

## Control flow

This is the basic syntax of if, else if, and else control flow:

```py
if x == 2:
  # Execute first success case
elif x === 3:
  # Execute second success case
else:
  # Execute fallback case
```

## Checking errors

Catching errors is just about using a `try`/`except`/`else` flow:

```py
number = input('Please put in a number: ')

# Try to cast the number (could be "100" or "one hundred")
try:
  number = int(number)
# If casting fails, catch the error
except ValueError as e:
  print('Your input was not a number.')
  print(e)
# If casting succeeds, move forward
else:
  print('You input a number!', str(number))
```

**Note**: `else` clause is optional!

You may have noticed `ValueError` in the example above. Here are some of Python's most common types of errors:

* `SyntaxError`
* `IndentationError`
* `AssertionError` (assertion failed in tests)
* `ValueError` (function received inappropriate value)
* `NameError` (invalid variable name used)
* `TypeError` (function received inappropriate data type)
* `IndexError` (index out of range in list)
* `KeyError` (key not found in dictionary)
* `MemoryError` (operation runs out of memory)
* `ZeroDivisionError` (attempted to illegally divide a number by zero)