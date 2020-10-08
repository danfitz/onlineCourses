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

**Pro tip**: We use static members when the concept we are representing is a **singleton**,i.e., it only needs one place in memory and not duplicates. For example, `DateTime.Now` only needs one instance. It's redundant to duplicate the current time in different objects.

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

3:30
