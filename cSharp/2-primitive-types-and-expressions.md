---
title: 'Primitive Types and Expressions'
part: 2
date: '2020-09-12'
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

**Another pro tip**: If you use `var` as your data type keyword, C# will make a best guess what data type you want.

```cs
var number = 2; // becomes int
var character = 'hello'; // becomes char
var boolean = true; // becomes bool
```

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

## Type Conversion

### Implicit type conversion

**Implicit type conversion** occurs when conversion between 2 data types leads to no data loss, so nothing extra needs to be done. (It's all done implicitly by the compiler.)

```cs
byte b = 1; // represented as 00000001
int i = b; // represented as 00000000 00000000 00000000 00000001
```

In the example above, implicit type conversion works because bytes can be represented as ints: you just need to prepend a bunch of zeros.

### Explicit type conversion or casting

**Explicit type conversion** or **casting** requires explicitly writing that you want the type conversion to occur because the compiler believes the conversion will lead to data loss.

```cs
int i = 300;
byte b = (byte)i;
```

In the example above, bytes can only represent numbers between 0 and 255. Because it was given a number outside of its range, you must prepend the data type like `byte(i)`. This tells the compiler that you're aware of the data loss and want to go through with it anyways.

### Conversion between non-compatible types

Sometimes data is represented in a different format than you want. The most common case is when a number is represented as a string.

```cs
string s = "1";
int i = (int)s;
```

Casting doesn't work here.

We need to use special methods to perform the conversion:

```cs
string s = "1";
int i = Convert.ToInt32(s); // method from the Convert class
int j = int.Parse(s); // method from the int data type
```

Here's some useful `Convert` methods:

- `ToByte()`
- `ToInt16()` (short)
- `ToInt32()` (int)
- `ToInt(64)` (long)

Also, every data type has a `Parse` method. So you can run `char.Parse` or `float.Parse` too!

## Operators

We have 5 types of operators:

- Arithmetic operators
- Comparison operators
- Assignment operators
- Logical operators
- Bitwise operators

### Arithmetic operators

- Addition +
- Subtraction -
- Multiplication \*
- Division /
- Remainder %
- Increment ++
- Decrement --

**Note**: There is **postfix** and **prefix** incremenet and decrement

```cs
// Postfix
int a = 1;
int b = a++;
// a = 2, b = 1

// Prefix
int a = 1;
int b = ++a;
// a = 2, b = 2
```

### Comparison operators

- Equal ==
- Not equal !=
- > , <, >=, <=

### Assignment operators

- Assignment =
- Addition assignment +=
- Subtraction assignment -=
- Multiplication assignment \*=
- Division assignment /=

### Logical operators

- And &&
- Or ||
- Not !

### Bitwise operators

- And &
- Or |
