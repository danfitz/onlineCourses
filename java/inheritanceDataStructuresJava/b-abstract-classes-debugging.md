---
title: 'Abstract Classes and Debugging'
part: 2
date: '2022-04-17'
categories: []
tags: [java]
source: [coursera]
---

# Abstract Classes and Debugging

## Abstract methods

Just like how you can declare a variable without defining it, it's possible to declare a method without defining it too. These methods are called **abstract methods**:

```java
public abstract void draw(int size);
```

**Note**:
* `abstract` keyword is essential
* You provide the access modifier, return type, method name, and parameters still
* Only the body (curly braces) are missing

## Abstract Classes

An **abstract class** tells the Java compiler that the class *cannot be instantiated*:

```java
public abstract class Shape {
  // ...
}

Shape shape = new Shape(); // illegal move!
```

**Note**: The moment you declare an abstract method in a class, that class **must** be turned into an abstract class!

**Note 2**: Not *all* methods in an abstract class have to be abstract. You can have some concrete methods too.

### Extending abstract classes

When you inherit an abstract class as a parent class, there are two possible outcomes:

1. If the subclass defines all of the inherited abstract methods, it's considered a **concrete class** and can now be instantiated.
2. If the subclass does *not* define all of the inherited abstract methods, it must be abstract too!

### Purpose of abstract classes

Abstract classes are useful when

1. You want to make sure each subclass implements certain methods before they can be instantiated, and
2. You don't want the class itself to be instantiated because it's too abstract to be useful on its own.

For example, using the `Plant` class is not very useful on its own, so by making the class and the method `grow` both abstract, we ensure it never gets used.

At the same time, `Hibiscus` inherits from `Plant`, but maybe every plant has its own way of `grow`ing. By making `grow` an abstract method in `Plant`, we force the user to define `grow` for `Hibiscus` before it can be instantiated/used.

### Syntax errors when accessing methods in subclass casted to superclass

Suppose you have a `Shape` superclass and a bunch of subclasses:

```java
class Shape {
  // ...
}

class Circle extends Shape {
  void draw() {
    // ...
  }
}

class Triangle extends Shape {
  void draw() {
    // ...
  }
}
```

`Shape` has no `draw` method, but its subclasses do.

Now suppose you want to store a bunch of shapes into an `ArrayList`:

```java
Circle circle = new Circle();
Triangle triangle = new Triangle();

ArrayList<Shape> shapes = new ArrayList<Shape>();
shapes.add(circle);
shapes.add(triangle);

for (Shape s : shapes) {
  s.draw();
}
```

Even though we know every subclass has a `draw` method, Java doesn't know that! Calling `draw` will result in a syntax error.

**Important**: Generally, subclasses know everything about their superclasses, but superclasses don't know about their subclasses. (That's why when we cast to `Shape`, Java has no awareness of the `draw` method anymore.)

### Abstract method as solution to syntax error

Abstract methods solve this problem with `draw`. By making `draw` an abstract method (and `Shape` an abstract class as a result), you're giving Java awareness of the `draw` method and requiring each subclass to implement it!

```java
abstract class abstract Shape {
  abstract void draw();
}

class Circle extends Shape {
  void draw() {
     // required
   }
}
```

## Interfaces

## Eclipse Debugger

**Debugging** allows you to run a program while watching the source code during execution.

Eclipse allows you to switch out of the Java perspective and into the **Debug perspective**, a set of views that make debugging easier.