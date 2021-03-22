---
title: 'Interfaces'
part: 5
date: '2021-03-09'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Interfaces

## What is An Interface?

An **interface** is a language construct similar in syntax to a class but is more like a *contract* * or *blueprint* for a class. As a real-world example, think of an interface as a job description for an open position: it describes what's required for the role, but anyone who meets the criteria can fill it.

```csharp
public interface ITaxCalculator
{
  int Calculate();
}

public class MyTaxCalculator : ITaxCalculator
{
  public int Calculate()
  {
    // Implementing the blueprint required by `ITaxCalculator`
  }
}
```

**Things to note**:

- By convention, all interface names start with `I`.
- Interfaces do not have any implementation. (The `Calculate` method has no curly braces!)
- Interface members do not have access modifiers like `public` or `private`.
- All classes that implement interface members must be `public`.

### Value of interfaces

When a class uses another class, this can create a tight coupling.

```csharp
public class OrderProcessor
{
  private readonly TaxCalculator _taxCalculator;
  
  public OrderProcessor()
  {
    _taxCalculator = new TaxCalculator();
  }

  public int CalculateTax()
  {
    // Do something with TaxCalculator
  }
}
```

For example, because `OrderProcessor` is using `TaxCalculator`, changing `TaxCalculator` could impact `OrderProcessor` (and any other classes using `OrderProcessor`).

Interfaces solve this problem: instead of using the `TaxCalculator` class, you use the `ITaxCalculator` interface.

```csharp
// This class is based on an interface
// NOTE: The syntax looks similar to class inheritance, but it's NOT the same thing
public class TaxCalculator : ITaxCalculator
{
}

public class OrderProcessor
{
  private readonly ITaxCalculator _taxCalculator;
  
  public OrderProcessor(ITaxCalculator taxCalculator)
  {
    _taxCalculator = taxCalculator;
  }

  public int CalculateTax()
  {
    // Do something with TaxCalculator
  }
}
```

Now `OrderProcessor` doesn't know about `TaxCalculator`. Instead, it accepts *any* class based on the `ITaxCalculator` interface. If you one day want to change the dependent class, you can with little to no impact to `OrderProcessor`.

**Note**: **Dependency injection** helps here (where `TaxCalculator` gets injected as a field for `OrderProcessor`).


## Testability

Essentially, interfaces help with **testability** because when performing unit testing on `OrderProcessor`, you don't have to think about `TaxCalculator`, making your tests *isolated to units*.

See Udemy video for more details.

## Extensibility

**Extensibility** is the idea that your code is written in such a way that it's easy to *extend* its capabilities as your needs change without changing the rest of your application.

In the example above, maybe we come up with a better way to calculate tax. So, we can create a new `BetterTaxCalculator` class that is based on the same `ITaxCalculator` interface.

And as long as we adhere to the interface's structure, we are able to improve `OrderProcessor` without touching it.

This is known as the **open-closed principle** or **OCP**: `OrderProcessor` is open for extension but closed for modification.

Other examples:

* `IRouteCalculator` allows us to improve our routing algorithm for our GPS app
* `ILogger` allows us to move from logging in the console to logging in a file to logging in a service at a moment's notice
* `IEncryptor` allows us to update our encryption algorithm that we use when storing sensitive data

## Interfaces and Inheritance

In C#, you have the ability to provide **multiple interfaces** to a class:

```csharp
public class InheritedClass : BaseClass, IInterface, IAnotherInterface
{
  // `InheritedClass` now inherits properties and methods from `BaseClass`
  
  // But it must now implement the methods in `IInterface` and `IAnotherInterface`
  public void InterfaceMethod() {}
  public void AnotherInterfaceMethod() {}
}
```

In contrast, in languages like C++, you can use *multiple inheritances*, and it looks exactly like the code above.

It's a common misconception that C# supports multiple inheritance too because of the syntactical similarity.

However, it's *not* multiple inheritance because we have to explicitly implement `InterfaceMethod` and `AnotherInterfaceMethod`. Those methods aren't inherited.

**Classes do not *inherit* from an interface. Classes *implement* an interface.**

## Interfaces and Polymorphism

Interfaces do however support *polymorphism*: the idea that some name can take on many forms.

For example, suppose in my `OrderProcessor` class I have a `Notify` method where I want to send messages to multiple channels at once.

I can store each notification channel in `OrderProcessor` and use a polymorphic method like `Send` that every notification channel shares.

```csharp
public class OrderProcessor
{
  private readonly IList<INotificationChannel> _notificationChannels;
  
  public void Notify(string message)
  {
    foreach (var channel in _notificationChannels)
      channel.Send(message);
  }
  
  public void RegisterNotificationChannel(INotificationChannel channel)
  {
    _notificationChannels.Add(channel);
  }
}
```

The important point is that the `INotificationChannel` enforces the `Send` method as a requirement for all our notification channels, allowing us to benefit from polymorphism.