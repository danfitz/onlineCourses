---
title: 'Static Variables, Methods, and Polymorphism using Overloading'
part: 3
date: '2022-04-08'
categories: []
tags: [java]
source: [coursera]
---

# Static Variables, Methods, and Polymorphism using Overloading

## Static Variables

Recall that *instance variables* are defined for each instance of a class. This has two effects:

* Any instance can have unique variable values
* An instance *must* be created in order to make use of instance variables

In contrast, **static variables** are the same for every instance of a class. You don't even need to instantiate a class to use them.

```java
public class Employee {
  // static variable
  // NOTE: by convention, they're written in the form "STATIC_VARIABLE"
  static String COMPANY = "Acme Inc.";
  
  // instance variable 
  String name;
  public Employee(String name) {
    this.name = name;
  }
}

// Referencing static variable is done with the class itself
System.out.println(Employee.COMPANY); // prints "Acme Inc."
```

**Pro tip**: Static variables are most useful for hard-coded values that you are confident will not change.

**Pro pro tip**: If you are *extremely* confident that a static variable will *never* change, you can use the `static final` keyword instead.

### Common use cases

One interesting use case is to store every instance created from a class in a static variable:

```java
public class Employee {
  static ArrayList<Employee> EMPLOYEE_LIST = new ArrayList<Employee>();
  
  public Employee() {
    Employee.EMPLOYEE_LIST.add(this);
  }
}
```

This allows you to share data across *every* instance of a class.

## Static Methods

**Static methods** are essentially the same thing as static variables but applied to methods instead.

**Note**: The `public static void main` method, the entry point for your entire application, is actually a static method! The runtime knows to run this static method to begin your application.

### Access in static methods

Static methods:

* Can only access static variables, not instance variables
* Can call other static methods
* Have no access to `this`

In contrast, instance methods:

* Can access static variables
* Can call static methods

### Common uses cases

* Helper methods
  * Example: `Math.sqrt`
* Methods that don't require access to an instance and its variables to compute data

## Polymorphism and Overloading

### Method signatures

In Java, you can make multiple methods with the *same name* as long as they have either different **types** or **sequences** for their parameters:

```java
public class Customer {
  // These are 2 different methods!
  void buy(String item) {}
  void buy(int itemCode) {}
}
```

These are known as the **signature** of a method.

### Overloading

**Polymorphism** means "many shapes".

This breaks up into 2 distinct forms of polymorphism:

* **Overloading**
  * Creating multiple methods with the same name but different signatures
* Overriding
  * Overriding a class's inherited methods with another method with the same signature

### Why overload a method

Overloading allows you to accommodate multiple data types. For example, `System.out.println` supports Strings, ints, doubles, etc. because it's been overloaded.

Also, overloading allows you to create a default case:

```java
public class Counter {
  int count = 0;
  
  public void increment(int amount) {
    this..count += amount;
  }
  
  // What happens if you don't provide any argument
  public void increment() {
    this.increment(1);
  }
}
```

Finally, overloading allows you to stack possible outcomes for your methods:

```java
public class Printer {
  public void print() {
    System.out.println("Hello");
  }
  
  // This version of `print` does the same thing as the original
  // but also prints a message you provide it!
  public void print(String message) {
    System.out.println(message);
    this.print();
  }
}
```

### Constructor overloading

**Constructor overloading** is method overloading but with 2 extra rules:

* Use the `this` keyword to call a constructor inside another constructor
* The use of `this` to call a constructor must be the first thing the new constructor does

**Best practice**: Use constructor overloading when you want to do essentially the same thing but with different parameters. For example:

```java
public class Point {
  int x;
  int y;
  
  // Shared behaviour for constructor!
  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
  // A default case when no arguments are provided!
  // (Using shared behaviour)
  public Point() {
    this(0, 0);
  }
}
```
