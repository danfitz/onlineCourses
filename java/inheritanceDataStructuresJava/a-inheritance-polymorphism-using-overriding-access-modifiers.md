---
title: 'Inheritance, Polymorphism using Overriding, and Access Modifiers'
part: 1
date: '2022-03-04'
categories: []
tags: [java]
source: [coursera]
---

# Inheritance, Polymorphism using Overriding, and Access Modifiers

## Inheritance

**Inheritance** is simply where one class inherits the *fields* and *methods* of another class. The class being inherited from is known as the **superclass** or **parent class**. The class doing the inheriting is known as the **subclass** or **child class**.

The main benefit of inheritance is it promotes *reusability* by allowing one class to re-use fields and methods that already exist in another class.

Here's the basic syntax for inheriting from another class:

```java
public class Animal {
  public void greeting() {
    System.out.println("I am an animal");
  }
}

public class Dog extends Animal {
  public static void main(String args[]) {
    Animal animal = new Animal();
    Dog dog = new Dog();
    
    animal.greeting();
    dog.greeting(); // has access to the same greeting via inheritance!
  }
}
```

## Overriding (as Part of Polymorphism)

Sometimes when a subclass inherits fields or methods from its parent class, you may want to **override** those fields or methods to support more custom behaviour.

### Overriding methods

To override an inherited method, you need to create a method according to the following rules:

* *Same signature* as the inherited method
* Return type must be the same too
* Overriding method *cannot be more private* than the inherited method

**Note**: As a best practice and to reduce errors, you can let the Java compiler know about a method override by including the `@Override` annotation above the method.

### Overriding `toString` and `equals`

It's generally best practice to always override `toString` and `equals`. This makes sense because printing a class or comparing it (especially during JUnit tests) tends to require unique implementations, and making sure these methods are accurate makes for easier debugging.

### Overriding constructors

Whenever a subclass runs a constructor, it automatically calls the superclass' *default zero-argument constructor* first.

```java
public class Foo extends Bar {
  public Foo() {
    super(); // calling `super` without any arguments happens automatically
  }
}
```

There are two ways you can override calling the superclass' default constructor:

```java
// 1. Call `super` with a different method signature
public class Foo extends Bar {
  public Foo() {
    super(true); // calls superclass constructor with boolean as single parameter 
  }
}

// 2. Completely ignore superclass constructors by calling sublass constructor
public class Foo extends Bar {
  public Foo() {
    this(true, 1, 2); // calls own constructor instead
  }
}
```

**Important**: Whenever explicitly invoking a superclass' constructor using `super`, it must always be the *first* thing you do.

### Calling overriden methods

Technically, when you override a method, Java basically hides it. You can actually still call it via `super`:

```java
public class Animal {
  public void greeting() {
    System.out.println("I am an animal");
  }
}

public class Dog extends Animal {
  @Override
  public void greeting() {
  super.greeting();
    System.out.println("I am a dog"); 
  }
  
  public static void main(String args[]) {
    Dog dog = new Dog();
    // Prints "I am an animal" and then "I am a dog"
    dog.greeting();
  }
}
```

**Pro tip**: You will usually call an overriden method when you want to keep the original functionality of the overriden method but just *add* more to it.

## Access Modifiers

**Access modifiers** are keywords that restrict the scope of a class, constructor, field, or method.

There are four types of access modifiers:

* `public`
  * Accessible from anywhere in the program
* `protected`
  * Accessible within the same package or via subclasses in a different package
* `default` (the default permissions when no access modifier is specified)
  * Accessible only within the same package
* `private`
  * Accessible only within the same class it's declared

### Choosing access modifiers

Here are some general principles to help you pick the right access modifier:

* Start with the most restrictive access modifier that makes sense for what you're defining
* Use `private` unless you have a good reason not to
* Avoid `public` as much as reasonably possible

### Getters and setters

The purpose of getters and setters is to usually access `private` or `protected` variables.

This design pattern is known as **encapsulation**: you hide a field from anything outside of the class to ensure people don't get caught up in your implementation. Instead, they get what they need via getters and setters.

**Importance**: This gives you the flexibility to edit your code more easily, as it's now more flexible.