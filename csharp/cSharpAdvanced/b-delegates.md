---
title: 'Delegates'
part: 2
date: '2021-04-28'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Delegates

## What are Delegates?

A **delegate** is a reference/pointer to a function or set of functions, allowing you to invoke methods coming from another object.

Delegates are most useful when you want to make your code *extensible* and *flexible*.

For example, suppose you are building a photo processing library. Instead of defining every process you can apply to a photo (resize, increase contrast, etc.), you can use a delegate where the user provides the processes *at runtime*.

This approach saves you time because you don't have to add new processes to your code and recompile everything. Instead, the user can define the processes themselves and provide them to your processor.

Similar to interfaces, delegates just accept a **signature** for your method(s).

```csharp
// Defining a delegate
public class PhotoProcessor
{
    // Signature: return type of void, parameter of Photo
    public delegate void PhotoFilterHandler(Photo photo);
    
    public void Process(string path, PhotoFilterHandler filterHandler)
    {
        var photo = Photo.Load(path);
        
        // Old approach:
        // var filters = new PhotoFilters();
        // filters.ApplyBrightness(photo);
        // filters.Resize(photo);
        
        // New approach:
        filterHandler(photo);
        
        photo.Save();
    } 
}

// Using a delegate
var processor = new PhotoProcessor();
var filters = new PhotoFilters();
PhotoProcessor.PhotoFilterHandler filterHandler = filters.ApplyBrightness;
filterHandler += filters.Resize; // adding extra methods

processor.Process("photo.jpg", filterHandler);
```

Now if the user wants to add their own custom process like `RemoveRedEye`, they can just tack it onto `filterHandler`.

```csharp
filterHandler += RemoveRedEye;
```

## How Delegates Work Under the Hood

Behind the scenes, a delegate is just syntactic sugar for instantiating the `System.Delegate` class. And when you apply multiple methods to a delegate, it just uses the `System.MulticastDelegate` class.

## `Action` and `Func`

C# provides you with built-in delegates, so you don't have to create your own custom delegates. These are `Action` and `Func`.

Use `Action` when the functions you give your delegate will always return `void`. Use `Func` when they will actually return something.

**Note**: These classes are generic classes. Every type parameter you pass matches the parameters of the function your delegate expects. For `Func`, the last parameter is always the return type.

Here's a refactor of the previous code to use `Action` instead:

```csharp
public class PhotoProcessor
{
    public void Process(string path, Action<Photo> filterHandler)
    {
        var photo = Photo.Load(path);
        filterHandler(photo);
        photo.Save();
    } 
}
```

## Comparison to Interfaces

In practice, interfaces can serve the same benefits as delegates. So when do you use one over the other?

This doesn't make sense to me now, but here are the situations where delegates are preferred according to the MSDN docs:

* An eventing design pattern is used
