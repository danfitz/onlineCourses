---
title: 'Introduction to Java, Classes, and Eclipse'
part: 1
date: '2022-03-04'
categories: []
tags: [java]
source: [coursera]
---

# Introduction to Java, Classes, and Eclipse 

Java is **compiled** to binary machine code known as **bytecode**, leading to the following benefits:

* Portable because different machines and operating systems can run Java
* Runs faster and more efficiently due to optimizations during compilation
* Catches errors early on during compilation

## Java basics

### Syntax

Things to consider related to Java syntax:

* **Camelcase** is the preferred variable naming convention
* Lines of code are determined via the semicolon `;`, and code blocks are determined using curly braces `{}`
* As a result, indentation/new lines/whitespace don't matter at all and are purely for readability

### Data types

Some primitive data types:

* `int`
* `float`
* `double` (larger, more precise float)
* `byte`, `short`, `long` (integer sizes with 8, 16, or 64 bits)
* `boolean`
* `char`

Some common non-primitive data types:

* `String` (an `Object`)
* `Integer`, `Boolean`, `Double` (wrapper classes for the primitive data types)

**Pro tip**: To know the data type of a value, you have access to the `getClass` method.

```java
String someString = "hello";
someString.getClass(); // returns class java.lang.String

// Some data types require casting TO an Object first
int someInt = 1;
((Object)someInt).getClass(); // returns class java.lang.Integer
```

### `String` vs. `char`

In Java, single quotes are for `char`, and double quotes are for `String`:

```java
String firstName = "Dan";
char grade = 'A';
```

Note that with `String`s, you can concatenate them with `+`:

```java
String sentence = "I am " + 8 + " years old";
```

**Note**: As you can see, Java automatically casts data types to `String`s during concatenation.

### Variables

You can declare a variable with and without values:

```java
// With values
int count = 0;
String firstName = "Dan";

// Without values
float cost;
String lastName;

cost = 5.1; // set later!
```

**Note**: You always include a pre-defined data type with a variable declaration. You *cannot* change the data type of a variable. This means Java is **statically typed**.

### Printing

To print data, you have the following options:

* `System.out.println(x)` prints something and ends the line
* `System.out.print(x)` prints something and doesn't end the line

### Iteration

`while` loops and `for` loops are just like JavaScript:

```java
int i = 0;
while (i < 10) {
  i++;
  // Loop 10 times
}

for (int j = 0; j < 10; i++) {
  // Loop 10 times
}
```

### Boolean operators and conditionals

Boolean operators and conditionals are pretty much the same as JavaScript too:

* `&&` and
* `||` or
* `!` not
* `==` equal
* `!=` not equal

```java
boolean isEven = x % 2 == 0;
if (isEven) {
  // ...
} else {
  // ...
}
```

### Getting input

Getting input from a user is as simple as:

```java
import java.util.Scanner;

Scanner scan = new Scanner(System.in); // System.in means input comes from keyboard

int num = scan.nextInt(); // reads next input as an int
String str = scan.next(); // reads next input as a string
String line = scan.nextLine(); // reads next line


scan.close(); // always close your scanner!
```

### Comments and Javadocs

Comments use the same syntax as JavaScript:

```java
// Comment type 1

/* Comment type 2
   (also multi-line!)
*/
```

Just like Python's docstrings, you also can add Javadocs right *before* a variable, function, or class:

```java
/**
 * Returns sum of two given numbers
 * @param firstNum First value to add
 * @param secondNum Second value to add
 * @return Sum of values
 */
public int getSum(int firstNum, int secondNum) {
  return firstNum + secondNum;
}
```

### Math operations

Math operations are all pretty standard:

* `+` for addition
* `-` for subtraction
* `*` for multiplication
* `/` for division
* `%` for modulus

### Character operations

Here's some common character/string operations you are likely to perform:

```java
// Get a char in a String
String str = "Dan";
char secondChar = str.charAt(1);

// Convert String to array of chars
Char[] chars = "Dan".toCharArray();

// Check that char is a letter
Character.isLetter('d');

// Check that char is uppercase or lowercase
Character.isUpperCase('d');
Character.isLowerCase('d');

// Convert char to uppercase or lowercase
Character.toUpperCase('d');
Character.toLowerCase('d');

// Compare chars
's' < 't';
's' == 't';
```

### Casting

Here's some basic casting operations you are likely to perform:

* `int` to `String`
  * `Integer.toString(int)`
  * `String.valueOf(int)`
* `String` to `int`
  * `Integer.parseInt(str)`

## Classes

Everything in Java is **class-based**. As a result (like C#), you always have to write at least *one* class to run a Java program.

Think of classes as **objects** that represent a **new data type**. You need to create an *instance* of the class to use the class though.

Classes consist of:

* **Fields** that hold data, the state of the object
* **Constructors** that run when creating a new class instance
* **Methods** that encapsulate computations the object can perform

### Class definition basics

```java
// public is an access modifier that makes the class
// visible/available to any other part of the program
public class Person {
  // Fields
  String name; // field declaration
  int age = 0; // field declaration, initially set to 0
 
  // Constructor
  public Person(parameters) {
    // things to do when class instance is created
    // parameters are passed in during instantiation
  }
  
  // Methods
  boolean isAdult() {
    return age >= 18;
  }
  void voteAsync() {
    // Do some stuff that doesn't require returning anything
  }
}
```

### Class instantiation

Creating a new class instance is pretty much as expected:

```java
Person person = new Person("Dan", 29);
```