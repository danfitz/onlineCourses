---
title: 'Generics'
part: 1
date: '2021-03-24'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Generics

## Value of Generics

In the past, if we wanted to create a custom `List` of, say, `Book` instances, you had to create a dedicated `BookList` class:

```csharp
public class BookList
{
  public void Add(Book book)
  {
  }
}
```

One way around this was to create a more reusable `ObjectList`, which would box value types or cast classes that you use.

```csharp
public class ObjectList
{
  public void Add(object obj)
  {
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

For multiple types, a good practice is to name the types:

```csharp
public class GenericDictionary<TKey, TValue>
{
  public void Add(Tkey key, TValue, value)
  {
  }
}
```

**Pro tip**: In most cases, you will find yourself _using_ generics that are part of .NET. It's very, very rare that you'll ever need to create your own generics.

In .NET, all the generics can be found in `System.Collection.Generic.XXXXX`.

## Applying Constraints to Accepted Types

It's valuable to be able to constrain the accepted types that can be passed in as `T` for two reasons:

1. By default, a user could pass in _any_ `T` type they want, which could be too wild.
2. If you don't constrain the accepted types, C# will assume `T` is an object, so C# will error out when you try to perform invalid operations or invoke invalid methods that objects don't have.

Suppose you're creating a generic class with a `Max` method that finds the max between 2 inputs:

```csharp
    public class Utilities<T>
    {
        public T Max(T a, T b)
        {
            return a > b ? a : b;
        }
    }
```

The operation `a > b` won't compile because C# will consider that an invalid operation. Additionally, what happens if the user passes in a string? We wouldn't want that.

So, one solution to this problem is to **constrain** `T` to an interface, setting a requirement that the type matches a specific contract.

In our case, we can constrain `T` to an `IComparable`, giving us access to the `CompareTo` method:

```csharp
  public class Utilities<T> where T : IComparable
  {
    public T Max(T a, T b)
    {
      return a.CompareTo(b) > 0 ? a : b;
    }
  }
```

**Note**: You're not limited to interfaces as constraints though. Here's some more.

```
// where T : Product
// = T is the Product class or one of its subclasses

// where T : struct
// = T is a value type

// where T : class
// = T is a reference type

// where T : new()
// = T is any object with a default parameter-less constructor
```

For example, here's a constraint for a class:

```csharp
public class DiscountCalculator<TProduct> where TProduct : Product
{
    public float CalculateDiscount(TProduct product)
    {
        return product.Price * product.Discount; // these properties come from Product
    }
}
```

Here's another example constraint for a struct:

```csharp
// This class allows a value type to be nullable (they aren't by default)
public class Nullable<T> where T : struct
{
    private object _value;
    public Nullable {}
    public Nullable(T value)
    {
        _value = value;
    }

    public bool HasValue
    {
        get { return _value != null; }
    }

    public T GetValueOrDefault()
    {
        if (HasValue)
            return _value;
        return default(T);
    }
}
```
