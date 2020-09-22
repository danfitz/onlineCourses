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

## Arrays

## Strings

## Enums

## Reference vs. Value Types
