---
title: "Primitive Types and Expressions"
part: 1
date: "2020-09-12"
categories: [backend]
tags: [c#]
source: [udemy]
---

# Primitive Types and Expressions

Topics include:

1. Variables and constants
2. Overflowing
3. Scope
4. Data types and type conversion
5. Operators

## Variables and Constants

A **variable** is a name given to a storage location in memory. A **constant** is an immutable value; it can't change.

You declare a variable with a _data type_ and an _identifier_:

```cs
int number;
int anotherNumber = 1;
```

**Note**: With variables, you can't use it until you've also initialized it with a value. So `anotherNumber` can be used but `number` can't.

You declare a constant the same way as a variable but with a `const` prefixed:

```cs
const float Pi = 3.14;
```

**Note**: With a constant, you must always assign a value.

**Pro tip**: If you want to use a reserved keyword like `int` as your identifier, you can use the `@` prefix like `@int`.

### Case conventions

For variables, the preference is **camel case** as in `maxZoom`.

For constants, the preference is **pascal case** as in `MaxZoom`.

## Primitive Types

There are 4 most common categories of data types each with their own size (this list is not exhaustive):

1. Integral numbers
   - `byte` - 1 byte, 0 to 255
   - `short` - 2 bytes, -32768 to 32767
   - `int` - 4 bytes, -2.1B to 2.1B
   - `long` - 8 bytes
2. Real numbers
   - `float` - 4 bytes
   - `double` - 8 bytes
   - `decimal` - 16 bytes
3. Characters
   - `char` - 2 bytes, unicode characters
4. Booleans
   - `bool` - 1 byte, true/false

**Note**: By default, the compiler assumes all numbers with decimals are the `double` data type. As a result, you must explicitly write `float num = 1.2f;` to tell the compiler that `1.2` is a float and not a double. Similarly, you must write `decimal num = 1.2m;` to tell it that `1.2` is a decimal. If you don't, the program will crash because the variable was given a double (which isn't the accepted type).

**Pro tip**: The more precision you want with your numbers, th larger the data type you use.

### Non-primitive types

There are also 4 main **non-primitive types** in C#:

- String
- Array
- Enum
- Class

## Overflowing

When you update a data type in a way that goes beyond its bounds, you run into **overflow**.

For example:

```cs
byte number = 255;
number = number + 1; // becomes 0
```

When you overflow, the value starts at the beginning again. In the example above, bytes can only represent 0 to 255. Adding 1 returns it to 0.

To solve this, you use the `checked` code block:

```cs
checked
{
  byte number = 255;
  number = number + 1;
}
```

`checked` basically throws an **exception** if you overflow, which you would then handle. If you don't handle it, the program will crash.

## Scope

**Scope** is where a variable/constant has meaning and is accessible. Typically, a variable/constant is within scope for its own code block and all its child code blocks.

Example:

```cs
{
  byte a = 1;
  {
    byte b = c + 1; // fails
    {
      byte c = a + 1; // works
    }
  }
}
```
