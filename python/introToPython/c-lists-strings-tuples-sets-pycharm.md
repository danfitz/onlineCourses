---
title: 'More with Lists, Strings, Tuples, Sets, and PyCharm'
part: 3
date: '2022-02-09'
categories: []
tags: [python]
source: [coursera]
---

# More with Lists, Strings, Tuples, Sets, and PyCharm

## More on Lists

Some more available operations:

* `ls3 = ls1 + ls2` concatenates lists and returns a new list
* `ls1.extend(ls2)` appends the values of a list to another list
* `repeated_ls = ls * 3` returns a new list with the sequence of values repeated x number of times
* `ls[-1]` returns the value at the index of `len(ls) - 1`; useful for grabbing values at the end of the list
* `ls[start_index:end_index]` returns a slice of a list as a new list
  * `start_index` is optional and is included in slice (defaults to `0` if not included)
  * `end_index` is optional and is NOT included in slice (defaults to `len(ls)` if not included)
  * **Pro tip**: A common way to create a copy of a list is via `ls[:]`
  * **Another pro tip**: You can set values at multiple indices at once via...
    * `ls[1:4] = [1,3, 5]`

Two forms of equality testing:

* Check for same reference: `ls1 is ls2`
* Check for same values: `ls1 == ls2`

## More on Strings

Think of strings like *lists of characters*. You can access characters at indices, except you just can't mutate them because strings are still immutable.

```py
my_string = "Hello"
my_string[1] # returns "e"
my_string[1] = "a" # throws error
```

Instead, to mutate a character, a good technique is to convert to a list and then `join`:

```py
my_string = "Hello"
chars = list(my_string)
chars[1] = "a"
my_new_string = "".join(chars) # returns "Hallo"
```

**Note**: `join` takes the string as the separator and the list as the argument.

Just like a list, you can slice strings too:

```py
my_string = "Hello"
my_string[0:2] # returns "He"
```

Here's some useful string methods: [see docs](https://docs.python.org/3/library/stdtypes.html#string-methods).

## Tuples

**Tuples** are:
* Sequence of values
* Values do not have to be the same type
* Immutable

Syntax for initializing tuple:

```py
# All valid ways of creating a tuple:
tuple1 = ("hello", 1, False)
tuple2 = "hello", 1, False
tuple3 = tuple(["hello", 1, False]) # converts list/string to tuple
```

To access values in a tuple:

```py
t = "a", "b", "c"

# Index access
t[0]

# Multiple variable assignment
a, b, c = t
```

**Pro tip**: Tuples are very useful when returning multiple things from a function at once.

```py
def min_and_max(ls):
  return min(ls), max(ls)
```

## Sets

**Sets** are collections with the following features:
* Unordered
* Do not contain indices
* Do not allow repeated elements
* Values do not have to be the same type
* Mutable

Syntax for initializing a set:
```py
set1 = { 1, "hello", False, "hello" } # "hello" only appears once
set2 = set([1, "hello", False, "hello" ]) # "hello" only appears once

empty_set = set() # empty sets cannot be initialized with {...}
```

Operations for sets:
* Iteration: `for item in set:`
* Adding element: `set.add("hello")`
* Removing element: `set.remove("goodbye")`