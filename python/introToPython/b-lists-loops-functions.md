---
title: 'Intro to Lists, Loops, and Functions'
part: 2
date: '2022-02-04'
categories: []
tags: [python]
source: [coursera]
---

# Intro to Lists, Loops, and Functions

## Lists

Lists are one of the most common **data structures** in Python.

Features:
* Mutable
* Members do not have to be same type
* Ordered

```py
sample_list = ['hello', 4, False]
```

Useful operations:
* `len(list)` returns number of members
* `list[0]` returns member at index
  * **Note**: Accessing members at an index that doesn't exist *will* throw an `IndexError`
* `list.index('dog')` returns the index of the value
* `list.append(item)` adds item to the end
* `list.pop()` removes and returns last item
* `list.pop(1)` removes and returns item at given index
* `item in list` checks if item is a member of the list and returns boolean

## Loops

**Loops** repeat a process/operation multiple times.

`for` loops run x amount of times (whatever you decide), and `while` loops run indefinitely as long as a condition is met.

### `for`

Iterating over a list:

```py
numbers = [1, 2, 3, 4, 5]
for number in numbers:
  print(number)
```

Iterating over a string:

```py
word = "Hello"
for letter in word:
  print(letter)
```

Iterating over a range of *integers* (useful when you want to run a code block a specific number of times):

```py
for x in range(10):
  print(x) # prints 0 to 9
  
for x in range(1, 7):
  print(x) # prints 1 to 6
  
for x in range(0, 31, 5):
  print(x) # prints 5, 10, 15, 20, 25, 30
  
for x in range(5, -1, -1):
  print(x) # prints 5 to 0
```

### `while`

Just be careful with a `while` loop because if the condition is never met, it never runs. And if the condition is always met, you'll run into an infinite loop that crashes your program.

**Pro tip**: A common use case is to continually request a specific input, re-asking until the user actually provides it.

```py
userInput = ""
while userInput != "hello":
  userInput = input("Please say 'hello'")

print("You said hello! Thank you.")
```

To exit a `while` loop completely, simply use the `break` keyword.

To move onto the next iteration in a `while` loop, simply use the `continue` keyword.


## Functions

**Functions** are just blocks of code that can accept an input, performs some computation, and then can return an output. They are useful for code reuse and help make your application more modular.

### Built-in functions

Functions that are part of the **core language**. Python just hands them to you automatically.

### User-defined functions

To create your own function, here's the basic syntax:

```py
def function_name(param1, param2, paramN):
  optionalOutput = ""
  # computations occur here
  return optionalOutput
```

**Pro tip**: It's recommended to include a **docstring** as the first comment in your user-defined function. This description is accessible to any other dev via `help(fn)` or `fn.__doc__`.

```py
def fn():
  """This is where the docstring lives"""
  # ...
```

### The `main` function

Every Python **module** (i.e. file) has a special `__name__` variable that's accessible.

* If the file is being run as the main program, `__name__` is set to `"__main__"`
* For all other modules, `__name__` is set to the module's filename

**Pro tip**: Best practice when running a main program is to use the following code pattern:

```py
def main():
  # Entry point for program
  
if __name__ == "__main__":
  main()
```

## Documentation (for users and programmers)