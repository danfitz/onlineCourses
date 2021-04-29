---
title: 'Lambda Expressions'
part: 3
date: '2021-04-29'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Lambda Expressions

A **lambda expression** is just an **anonymous method**: no access modifier, no name, and no return statement.

Syntax-wise, a lambda expression is exactly like an arrow function in JavaScript.

To see a lambda expression in action, it's useful to store a lambda expression in a delegate:

```csharp
Func<int, int> square = number => number * number;
Console.WriteLine(square(5)); // prints 25
```

**Note**: You may notice that you don't have to provide parameter types or a return type. The compiler infers these types for you.

Another use common use case for lambda expressions is to pass them as arguments to methods. For example, any instance of `List` has access to the `FindAll` method. This method accepts a `Predicate<T>` that must return a `bool`, which then returns every item in `List` that returns `true`.

```csharp
var books = new BookRepo().GetBooks();
var cheapBooks = books.FindAll(b => b.Price < 10);
```

**Pro tip**: By convention, with methods like `FindAll`, we name the parameter of our lambda expression a single letter because it's clear what we're talking about. That's why the lambda expression is written out as `b => b.Price < 10`.
