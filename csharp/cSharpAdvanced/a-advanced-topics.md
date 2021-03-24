---
title: 'Advanced Topics'
part: 1
date: '2021-03-24'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Classes

## Generics

In the past, if we wanted to create custom `List` of, say, `Book` instances, you had to create a dedicated `BookList` class:

```csharp
public class BookList
{
  public void Add(Book book)
  {
    throw new NotImplementedException();
  }
}
```

One way around this was to create a more reusable `ObjectList`, which would box value types or cast classes that you use.

```csharp
public class ObjectList
{
  public void Add(object obj)
  {
    throw new NotImplementedException();
  }
}
```

However, this has performance costs due to boxing and casting!

So, **generics** were created to solve these problems! With generics, you create a class once and defer the typing until _runtime_.

```csharp
// T is short for type
public class GenericList<T>
{
  public void Add(T value)
  {
  }
}

var books = new GenericList<Book>();
```
