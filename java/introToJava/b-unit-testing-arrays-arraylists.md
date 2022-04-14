---
title: 'Unit Testing, Arrays, and ArrayLists'
part: 2
date: '2022-03-23'
categories: []
tags: [java]
source: [coursera]
---

# Unit Testing, Arrays, and ArrayLists

## Unit Testing

The purpose of unit tests is to automatically run a set of tests every time to ensure your code continues to work as expected.

A popular unit testing framework in Java is **JUnit**.

A **unit test** is a set of tests that tests the units (methods) of a single class. A **test case** tests the response of exactly *one* unit (method) to a particular set of inputs.

**Bonus**: **Integration testing** tests how well classes and methods work together. This is outside the scope of this course though.

### Assertions

The basic idea of unit tests is to compare expected results to actual results.

1. Call method to get actual results.
2. Make an assertion about what the expected result should be compared to the actual result.
3. If JUnit fails a test, an `AssertionError` is thrown, which JUnit catches and displays for you.
4. Rinse and repeat as many times as necessary.

In JUnit, here's some common assert methods:

* `assertTrue(boolean test, String message)` where `message` is optional
* `assertFalse(boolean test, String message)` where `message` is optional
* `assertEquals`
* `assertNotEquals`
* `assertArrayEquals` compares contents of two arrays for equality
* `assertSame` checks for referential equality
* `assertNotSame`
* `assertNull` and `assertNotNull`
* `assertThrows` and `assertDoesNotThrow` checks for an exception

**Pro tip**: We don't really test getter methods that just return internal fields in a class instance.

### Creating a JUnit test

A JUnit test typically has two main parts:

* A `@BeforeEach` method that performs `setUp` before each test
* Multiple test methods each annotated with `@Test`

```java
public class CounterTest {
  Counter counter1;
  
  @BeforeEach
  void setUp() throws Exception {
    this.counter1 = new Counter(); // sets up new counter for every test
  }
  
  @Test
  void testIncrement() {
    assertTrue(this.counter1.increment() == 1);
  }
  
  @Test
  void testDecrement() {
    assertTrue(this.counter1.decrement() == -1);
  }
}
```

### Testing for equality

Recall that comparing Objects depends on the `equals` method, which needs to be custom implemented for custom Objects.

JUnit's `assertEquals` method uses `==` to compare primitives and the `equals` method to compare Objects. So, if you're comparing two custom Objects, make sure the `equals` method has been implemented.

## Arrays

Arrays have a lot of the common features of ordered collections:

* Indexes items from 0 to length of array minus 1
* Can contain any type of element (primitives or Objects)

Some unique features though:

* Can only store the **same data type**
* Can only have a **fixed number of slots**
  * Because of this, arrays cannot be easily resized; you have to create a new array and copy over the contents of the old array

### Initializing and updating an array

Here's the basic Java syntax for initializing and updating an array in *two separate steps*:

```java
// Initialization
int[] arrayOfInts = new int[10];
String[] arrayOfChars = new String[100];
Customer[] arrayOfCustomers = new Customer[15];

// Updating
arrayOfInts[0] = 5;
arrayOfInts[1] = 4;
arrayOfInts[2] = 3;
```

**Note**: When accessing indices outside of the range set by the array during initialization, Java will throw a runtime error.

You can, however, initialize and add to an array *all in one step* too:

```java
int[] arrayOfInts = { 1, 2, 3, 4, 5 };
```

**Note**: However, when pre-populating your array, you *must* do so during initialization. You cannot declare the variable and then add the array items afterwards.

### Array fields and methods

To access the length of an array, arrays have a field available: `arr.length`.

Typical operations like adding, removing, or reversing an array are not available. 

Here's an array's available methods: https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/Array.html.

### Iterating through an array

```java
// Index approach
for (int i = 0; i < names.length; i++) {
  String name = names[i];
}

// Declarative approach
for (String name : names) {
  System.out.println(name);
}
```

### Nested arrays

```java
int[][] table = {
  {1, 2},
  {3, 4},
  {5, 6}
}

table[1][1] // returns 4
```

**Note**: To check if two nested arrays are equal, you can use `Arrays.deepEquals`.


## ArrayLists

`ArrayList`s are just like arrays but more flexible; they work just like lists in Python.

Features:

* Have a **variable** number of slots
* Can *only* contain Objects of the same type
* Part of Java's `Collections` framework
  * You must explicitly import it via `import java.util.ArrayList`

### Initializing an `ArrayList`

```java
ArrayList<Integer> numbers = new ArrayList<Integer>();
ArrayList<String> strings = new ArrayList<String>();
```

**Note**: For primitive data types, you can use them as long as you pass the **wrapper class** that makes the primitives into Objects--like `Integer` for `int` or `Double` for `double`.

### `ArrayList` fields and methods

Common methods to use:

* `add`
* `remove`
* `get`
* `size`
* Full documentation: https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html