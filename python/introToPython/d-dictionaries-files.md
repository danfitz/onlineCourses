---
title: 'Dictionaries and Files'
part: 4
date: '2022-02-15'
categories: []
tags: [python]
source: [coursera]
---

# Dictionaries and Files

## Dictionaries

**Dictionaries** are a way to store data as unordered key-value pairs. This is extremely useful to represent attributes of a single thing.

Features:
* Keys are usually strings or ints
* Values can be any type
* Mutable

Initialization:

```py
person = { "name": "Dan", "age": 29 }
```

Operations:

```py
person = { "name": "Dan", "age": 29 }

# Element access
person["name"]
person["social_insurance_num"] # throws KeyError
person.get("social_insurance_num") # returns None
person.get("social_insurance_num", 0) # returns fallsback 0

# Element count
len(person) # returns 2

# Convert to list
keys = person.keys() # returns list of keys (as a view object)
key_values = person.items() # returns tuples of key-value pairs (as a view object)

# Iteration
for key in person:
  # ...

# Element mutation
person["name"] = "John" # edit
del person["name"] # remove

# Element check
"name" in person # returns False

# Add attributes from another dictionary
person.update({ "location": "Canada" })
```

## Files

### Opening

To open a file, use the following command:

```py
stream = open(path_to_file, mode)
```

where `mode` can be one of
* `"r"` to read file (default mode)
  * Returns error if file doesn't exist
* `"w"` to write to file
  * Removes all old data if file exists
  * Creates file if it doesn't exist
* `"a"` to append to end of file
  * Creates file if it doesn't exist
* `"r+"` to read and write at the same time
  * Returns error if file doesn't exist
  * Does NOT remove old data if file exists

### Reading

The following functions are available for reading files when you have a `stream` available:

* `stream.read()` reads all text
* `stream.readline()` reads one line
* `stream.readlines()` reads all lines as a list

**Pro tip**: When reading lines, you'll often have whitespace characters like `\n` at the end. Use the string method `rstrip` to remove them.

### Writing

The following functions are available for writing lines to a file when you have a `stream` available:

* `stream.write(string)` writes text
* `stream.writelines(list_of_strings)` writes multiple lines

## Closing

Any time you finish reading/writing/appending to a file, you must remember to close the file. Otherwise, you risk having incomplete changes.

There are 2 ways to close a file:

```py
# Imperatively
stream.close()

# Using `with` statement
with open(path_to_file, "r") as stream:
  # closes automatically after executing code block
```
