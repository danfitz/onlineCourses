---
title: 'Working with Text'
part: 7
date: '2020-09-29'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Working with Text

This section deals with **strings**:

- Useful string methods
- Converting strings to numbers
- Converting numbers to strings
- The `StringBuilder` class

## Useful String Methods

### Formatting

- `ToLower` converts to lowercase
- `ToUpper` converts to uppercase
- `Trim` removes whitespace around the string

### Searching

- `IndexOf(x)` returns index of first matching character or substring
- `LastIndexOf` returns index of last matching character or substring

### Manipulating

- `Substring(index, length)` gets a substring
- `Replace(input, output)` replaces characters/substrings

### Null checking

- `String.IsNullOrEmpty(str)`
- `String.IsNullOrWhiteSpace(str)`

### Splitting

- `str.Split(splitPoint)`

## Conversion

### Converting strings to numbers

Very often when a user inputs something, it will be in a string format. You might want to convert that string to a number, especially if the input is meant to be a number.

```cs
string s = "1234";
int i = int.Parse(s); // method 1
int j = Convert.ToInt32(s); // method 2
```

**Pro tip**: If the string is null or just whitespace, `int.Parse` will throw an exception. In contrast, `Convert.ToInt32` will return `0`. For this reason, `Convert.ToInt32` is often safer to work with.

### Converting numbers to strings

Every integer has a `ToString` method that accepts an optional format string.

```cs
int i = 1234;
string s = i.ToString(); // "1234"
string t = i.ToString("C"); // "$1,234.00"
string u = i.ToString("C0"); // "$,234"
```

## StringBuilder

In the `System.Text` namespace, there is a `StringBuilder` that allows you to create **mutable strings**.

In other words, it comes with a bunch of useful manipulation methods like `Append` or `Insert` or `Remove`. You use these on your `builder` instance, and it's like writing onto a piece of paper.

In contrast, while regular strings have these manipulation methods, they are more costly because they return a brand new string. So, if you're performing a lot of manipulations, it could be a good idea to use `StringBuilder`.

**Note**: Efficient string manipulation comes at the cost of having no searching methods. There are no methods like `IndexOf` or `Contains` or `StartsWith`.

```cs
using System.Text;

var builder = new StringBuilder();
builder.Append('-', 10);
builder.AppendLine();
builder.Append("Header");

// You can also chain methods!
builder
  .AppendLine();
  .Append('-', 10);
  .replace('-', '+');

// Prints
// ++++++++++
// Header
// ++++++++++
Console.WriteLine(builder);

// Although you don't have searching methods,
// StringBuilder still comes with index access
Console.WriteLine(builder[0]);
```
