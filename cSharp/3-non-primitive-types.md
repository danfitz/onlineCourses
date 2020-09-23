---
title: 'Non-primitive Types'
part: 1
date: '2020-09-19'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Non-primitive Types

**Non-primitive types** include

- Classes
- Strings
- Structs
- Arrays
- Enums
- And more

## Classes

Classes have **fields** and **methods**. They are used to create objects, which become **instances** of those classes.

To create a class, we write:

```cs
public class Person
{
  // Field
  public string Name;

  // Method
  public void Introduce()
  {
    Console.WriteLine("Hi, name is " + Name);
  }
}
```

**Note**: ``public` is an **access modifier**. It determines who can access the class or field or method.

### Creating objects

Creating an object is sort of like declaring any variable: you provide a **type** and a **variable name**.

```cs
int number;
Person person = new Person();
```

The only difference is that you have to explicitly call `new ClassName()`. (You do this to tell C# to allocate memory for your object.)

**Note**: You can use `var Person = new Person();` here too, and C# will make a best guess what data type the variable is.

### The static modifier

A **static modifier** uses the `static` keyword to make a field or method accessible via the class itself (instead of the object instance).

```cs
public class Calculator
{
  public static int Add(a, b)
  {
    return a + b;
  }
}

int result = Calculator.Add(1, 2);
```

**Note**: When you use `static`, the field or method is not accessible in the object instance. At the same time, this means the field or method is not duplicated in memory for every object instance either; it's only found once in the class itself.

## Structs

**Structs** are like classes except more **lightweight** (there a lot of subtle differences).

**Pro tip**: 99% of the time, you'll be creating classes, not structs. Use structs when you want something small and lightweight. This is especially useful if you're creating 1000s of objects of that type, as small and lightweight means less load for the computer.

Good candidates for structs:

```cs
public struct RgbColor
{
  public int Red;
  public int Green;
  public int Blue;
}

public struct Coordinate
{
  public float Latitude;
  public float Longitude;
}
```

**Note**: All primitive data types like `int` or `bool` are actually structs! To see this for yourself, just type `int number;` and hover over `int`. As a result, these 2 variable declarations are the same!

```cs
int number;
Int32 number;
```

## Arrays

**Arrays** store a *fixed-size* collection of variables of the *same type*.

```cs
// This is an array that accepts 3 integers
int[] numbers = new int[3] { 1, 2, 3 };

// Alternatively, you can add the items after initialization
numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
```

**Note**: Once again, we use the `new` keyword to explicitly allocate memory for the array, as C# won't do that automatically for us.

**Pro tip**: When you create a new array, internally you are actually creating an *instance* of a class. That's why it looks like a class so much.

### Incomplete arrays

Notice what happens when you use an array where not all items have been set in the array:

```cs
int[] numbers = new int[3];
numbers[0] = 1;

Console.WriteLine(numbers[0]); // prints 1
Console.WriteLine(numbers[1]); // prints 0
Console.WriteLine(numbers[2]); // prints 0
```

When items are not set in an array, the value falls back to the *default for that data type*. In this case, the default for `int` is `0`.

## Strings

**Strings** are just sequences of characters denoted by the double quotes: `"hello world"`.

```cs
// String literal
string name = "Dan Fitz";
// String concatenation
string anotherName = firstName + " " + lastName;
// String format
string altName = string.Format("{0} {1}", firstName, lastName);
// String join (using an array)
var numbers = new int[3] { 1, 2, 3 };
string list = string.Join(",", numbers);
// Accessing string characters
string simpleName = "Mosh";
char firstChar = simpleName[0];
```

Strings are **immutable**. Once you create them, you can't change them.

```cs
string name = "Dan";
name[0] = "M"; // doesn't work
```

**Verbatim strings** prefix `@`, so you don't have to use escape characters in your string.

```cs
// String with escape characters
string path = "c:\\projects\\project1\\folder1";
// Verbatim string
string path = @"c:\projects\project1\folder";
```

**Note**: Behind the scenes, strings are actually **classes**. As a result, these 2 variable declarations are the same!

```cs
string firstName = "Dan";
String lastName = "Fitz";
```

## Enums

**Enums** are data types that represent a **set of name-value pairs** or constants.

**Pro tip**: Enums are especially useful when you have a set of constants in your application, so it's cleaner to group them together.

```cs
// Instead of this...
const int RegularShipping = 1;
const int ExpressShipping = 2;

// Do this
public enum ShippingMethod
{
  Regular = 1,
  Express = 2;
}
```

**Note**: Think of the integers as ids for each constant in the enum.

Enums are useful for getting at values when you have one already available.

```cs
// Get an int from an enum using casting
var method = (int)ShippingMethod.Express; // returns 2

// Get an enum from an int using casting
var methodId = (ShippingMethod)2; // returns "Express" enum

// Parse a string into an enum
var shippingMethod = Enum.Parse(typeof(ShippingMethod), "Express"); // returns "Express" enum
```

**Note**: `Enum.Parse` is a way of converting a data type *into* a specified enum.

## Reference vs. Value Types
