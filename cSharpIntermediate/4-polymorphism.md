---
title: 'Polymorphism'
part: 4
date: '2021-03-08'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Polymorphism

**Polymorphism** in C# is the idea that a variable, function, or object can take on **many forms** but still share the *same name*.

## Method Overriding

**Method overriding** is _modifying_ the implementation of an inherited method (from a base class).

To override the implementation of an inherited method, just add the `virtual` keyword to the base class and the `override` keyword to the derived class:

```csharp
public class Shape
{
    public virtual void Draw() {}
}

public class Circle : Shape
{
    public override void Draw()
    {
        base.Draw(); // Perform original implementation
        
        // Perform new implementation
    }
}

var shapes = new List<Shape>
{
  new Shape(),
  new Circle()
}

foreach (var shape in shapes)
{
  shape.Draw();
}
```

**Note**: `base` gives us access to the base class. We can (but are not required to) perform the original implementation using `base.Draw()`!

**Value of method overriding**: It encourages polymorphism. By overriding inherited methods with `virtual` and `override`, we can add new features in encapsulated classes.

For example, if we want to one day add a brand new `Triangle` class, we can just append the class without changing any other code:

```csharp
public class Triangle : Shape
{
    public override void Draw()
    {
        // Perform new implementation
    }
}

var shapes = new List<Shape>
{
  new Shape(),
  new Circle(),
  new Triangle()
}

foreach (var shape in shapes)
{
  shape.Draw(); // polymorphic
}
```

## Abstract Classes and Members

The `abstract` modifier indicates that a class and/or member is missing implementation.

For example, the `Draw` method of the `Shape` class is impossible to implement because it's too abstract. What does it even mean to draw a shape? So, you write `abstract` to let derived classes know that implementation *must be added*.

```csharp
public abstract class Shape
{
    public abstract void Draw();
}

public class Circle : Shape
{
    public override void Draw()
    {
        // Filling in implementation
    }
}
```

Rules of abstract members:

* Cannot include implementation (no body code block)
* If a member if declared as abstract, the containing class must also be declared as abstract
* Any derived class *must* implement all abstract members in the base abstract class (you'll get an error otherwise)
* Abstract classes cannot be instantiated (`new Shape()` doesn't work)
    * *This makes sense because an abstract class is too abstract to use*

### Benefit of `abstract`

You use `abstract` when you want to provide some *common behaviour* while forcing other devs to *follow your design*.

It's more prescriptive than `virtual` because, with `virtual`, another dev could choose not to override the inherited method.

`abstract` *forces* other devs to perform an override.

### Real-world example of `abstract` class

The `System.IO.Stream` is a good example of an abstract class. When you think about it, it makes sense: how could you possibly use a `Stream` itself? You could derive a `FileStream` or `MemoryStream`. That's usable. But a `Stream` is not useful.

## Sealed Classes and Members

The `sealed` modifier is the opposite of an abstract class: it prevents derivation of classes or overriding of methods. You apply `sealed` to the class itself and/or its members.

**Note**: You can only apply `sealed` to an overriden inherited method.

```csharp
// No class can derive from Circle
public sealed class Circle : Shape {}

// No derived class can override Draw
public class Circle : Shape
{
    public sealed override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}
```

### Value of `sealed`

`sealed` classes are slightly faster due to some run-time optimizations.

**Pro tip**: `sealed` hardly ever gets used. In fact, it could be an anti-pattern because it messes with your inheritance hierarchy. So, try not to use `sealed` unless you have a very strict reason to do so.

### Real-world example of `sealed` class

The `String` class is `sealed`.