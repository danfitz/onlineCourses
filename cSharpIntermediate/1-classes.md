---
title: 'Classes'
part: 1
date: '2020-10-05'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Classes

## Intro to Classes

### What is a class?

A class is a **building block** of an application. All these classes _together_ provide the _behaviour_ of an application.

A class has 2 parts:

- Data represented by **fields**
- Behaviour represented by **methods**

To declare a class:

```cs
public class Person
{
  public string Name; // field
  public void Introduce() // method
  {
    Console.WriteLine("Hi, my name is " + Name);
  }
}
```

**Note**: `public` is an access modifier that you'll learn about later.

### Examples of classes

In a real-world application, there are usually 3 layers to any application:

1. **Presentation layer**

   - How the data looks

2. **Business layer**

   - The business logic

3. **Persistence layer**
   - Data access

Example:

1. `PostView` displays post information to a user
2. `Post` handles the logic of posts
3. `PostRepository` knows how to save to or read from a database

### What is an object?

Objects are **instances of classes**. If `Person` is a class, then `John`, `Mary`, and `Scott` are objects of that class.

To instantiate an object:

```cs
Person person = new Person();
```

### Static members

Some fields and methods are accessible from class instances. These are called **Instance members**.

```cs
var person = new Person();
person.Introduce();
```

On the other hand, some fields and methods are accessible from the class itself. These are called **static members**.

```cs
public class Person
{
   public string Name;

   public static string Species = "mammal";
   public static Person Parse(string str)
   {
      var person = new Person();
      person.Name = str;
      return person;
   }
}

Person.Species;
var person = Person.Parse("Dan");
```

Notice how we use the `static` access modifier to set a static member!

**Pro tip**: We use static members when the concept we are representing is a **singleton**, i.e., it only needs one place in memory and not duplicates. For example, `DateTime.Now` only needs one instance. It's redundant to duplicate the current time in different objects.

## Constructors

A **constructor** is simply a _method_ that is called when an _instance of a class is created_. This is useful for initializing some fields in the class.

```cs
public class Customer
{
   public Customer()
   {
   }
}
```

**Important details**:

- A constructor _must_ have the same name as the class.
- The above constructor is known as a _parameter-less_ or _default_ constructor.
- If you don't provide a constructor yourself, the compiler will automatically add a default constructor in for you.
- If any fields don't get initialized, they fallback to their default values:
  - `int` becomes `0`
  - `bool` becomes `false`
  - `char` becomes `''`
  - reference types like `string` and objects become `null`

Here's a constructor with actual parameters:

```cs
public class Customer
{
   public string Name;
   public Customer(string name)
   {
      this.Name = name;
   }
}

Customer customer = new Customer("Dan");
```

**Note**: The `this` keyword references the current object being initialized.

### Constructor overloading

In classes, you can utilize **constructor overloading** where you define _more than one_ constructor to account for different parameters.

```cs
public class Customer
{
   public Customer() {
      // ...
   }
   public Customer(string name) {
      // ...
   }
   public Customer(int id, string name) {
      // ...
   }
}
```

Constructor overloading allows your class to be used more flexibly. For example, sometimes you don't know the `id` of a customer, their `name`, or both. You want to be able to create a customer in any of these cases.

**Note**: When you constructor overload, your class won't automatically create the default parameter-less constructor _for you_, so you need to explicitly define it like above.

**Important**: A constructor is considered unique based on the _order_ of the parameter data types.

### Calling constructors inside other constructors

Sometimes one of your class' constructors has all of the initialization you want in another constructor. In this case, it would be great to be able to re-use a constructor _inside_ another constructor.

For example, whenever you create a field containing a data type like a `List`, you need to initialize it before it can be used (otherwise it will default to `null`).

```cs
public class Customer
{
   public List<int> Grades;

   public Customer()
   {
      this.List = new List<int>();
   }
}
```

In cases like the above (and more), you don't want to have to explicitly initialize the `List` in every other constructor. Instead, you can re-use your constructors inside other constructors:

```cs
public class Customer
{
   public int Id;
   public string Name;
   public List<int> Grades;

   public Customer()
   {
      this.List = new List<int>();
   }

   public Customer(int id)
      : this()
   {
      this.Id = id;
   }

   public Customer(int id, string name)
      : this(id)
   {
      this.Name = name;
   }
}
```

`this()` and `this(id)` always get called **before** the constructor runs. So in effect, you are _stacking_ constructor initialization.

**Pro tip**: Stacking constructor initialization, although possible, is not recommended due to the way it requires you to trace what's going on. It's a better idea to limit this stacking to initialization that you _have_ to perform—like initializing a `List`.

## Object Initializers

**Object initializers** allow you to initialize an object _without_ using a class constructor.

```cs
var person = new Person
{
   FirstName = "Dan",
   LastName = "Fitz"
}
```

The reason object initializers were added to C# was they prevented the need to constructor overload to account for _every possible_ combination of initialized values.

Instead, the idea is to restrict constructors to initialization that **must** happen in order for the object to work.

**Note**: When you initialize an object using an object initializer, the default constructor _still_ runs first.

## Methods

### Signature of methods

The **signature** of a method is basically its

1. Name, plus
2. The number and type of parameters

```cs
public class Point
{
    // This method is characterized by name "Move" and int x and int y
    public void Move(int x, int y) {}
}
```

### Method overloading

Just like how you can overload constructors, you can **overload methods**.

This is especially useful when you want to give the consumer of your class more options around that method.

```cs
public class Point
{
    // When you have 2 coordinates
    public void Move(int x, int y) {}

    // When you have a Point instance
    public void Move(Point newLocation) {}

    // When you have a Point instance and a speed!
    public void Move(Point newLocation, int speed) {}
}
```

### Params modifier

Suppose you have a method that could take a varying number of parameters. For example, the `Add` method might need that.

```cs
public class Calculator
{
    public int Add(int a, int b) {}
    public int Add(int a, int b, int c) {}
    public int Add (int a, int b, int c, int d) {}
}
```

Overloading, like in the case above, wouldn't work because there's an infinite number of cases to consider.

Well, what if you passed an _array_ instead?

```cs
public class Calculator
{
    public int Add(int[] numbers) {}
}

int result = calculator.Add(new int[] { 1, 2, 3, 4 });
```

This works! But there's only one downside: every single time you want to pass arguments to `Add`, you have to place the data in an array. That's a bit awkward.

To solve this, C# gives us the **params modifier**. This modifier collects all of your method's parameters _into_ an array for you.

```cs
public class Calculator
{
    public int Add(params int[] numbers) {}
}

// Supports passing an array
var result = calculator.Add(new int[] { 1, 2, 3, 4 });
// Or passing individual arguments
var result = calculator.Add(1, 2, 3, 4);
```

### Ref modifier

The **ref modifier** allows you to pass the reference for a variable, so you can update the value of that variable inside your method.

```cs
public class MyClass
{
    public void MyMethod(ref int a)
    {
        a += 2;
    }
}

var a = 1;
classInstance.MyMethod(ref a);
Console.WriteLine(a); // 3
```

Notice how `ref` is used for the argument _and_ the parameter. This is required.

**Note**: The ref modifier is not best practice, so please try to avoid it.

### Out modifier

The **out modifier** is pretty much identical to the ref modifier with the exception that you don't have to initialize the variable before passing it into the method. However, you _do_ have to initialize the variable _inside_ the method.

```cs
public class MyClass
{
    public void MyMethod(out int a)
    {
        a = 3; // initialization required
    }
}

int a; // not initialized
classInstance.MyMethod(out a);
Console.WriteLine(a); // 3
```

You may use the out modifier at times though, so it's good to know. One common use case is with `int.TryParse`. This method allows you to convert a string into an int without throwing an exception if it fails.

```cs
int number;
var result = int.TryParse("abc", out number);
if (result)
    Console.WriteLine(number);
```

## Fields

## Access Modifiers

## Properties

## Indexers
