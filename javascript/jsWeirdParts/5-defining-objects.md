---
title: 'Defining Objects'
part: 5
date: '2019-10-15'
categories: [frontend]
tags: [js]
source: [udemy]
---

# Defining Objects

## Function Constructors, new, and The History of JavaScript

There are lots of different ways to construct objects. We know object literals already: `{}`. Another way to construct objects is to use **function constructors** and the `new` keyword.

```js
// Function constructor
function Person() {
  this.firstName = "Dan";
  this.lastName = "Fitz";
};

const dan = new Person();
```

The power of the function constructor comes from the `new` keyword, an operator that returns a constructed object. `new` is basically syntactic sugar for a series of steps:

1. `new` creates an empty object `{}`.
2. Then it invokes the function `Person()`.
3. It changes the `this` reference to that empty object it created.
4. Finally, it runs `Person()` with the new `this`.

**Note**: If you place a `return` inside your function constructor, it overrides the default behaviour of `new`!

## Function Constructors and '.prototype'

Function constructors *automatically* set the prototype for you via the `prototype` property built into every function object (just like `name`).

The `prototype` property never gets used *until* you use the `new` keyword. By default the `prototype` property is an empty object.

To add properties and methods to the prototype, do this:

```js
FuncConstruct.prototype.prop1 = 1;

const obj = new FuncConstruct();
obj.prop1; // 1
```

The *power* of a prototype is that every linked object will pull properties and methods from the same reference: `FuncConstruct.prototype`. This allows you to add properties and methods *on the fly*.

**Best practice**: Properties are typically placed inside the constructor because they vary between objects. But methods are placed in the `prototype`.

A major reason to place methods in the `prototype` is **efficiency**. Placing a method in the function constructor means creating new memory space for every single object created, which could be 1000s. On the other hand, having objects all reference the same `prototype` for the same method means only needing it in one place in memory.

## Dangerous Aside: Functions and 'new'

The JavaScript engine won't throw an error if you forget to add `new` because it will just think it's running a basic function instead of a function constructor.

**Solution**: By convention, capitaize your function constructor, so it's easy to tell what you're dealing with.

## Conceptual Aside: Built-in Function Constructors

Built-in function constructors like `Number` and `String` are where you get access to all properties and methods for different primitives. These properties and methods come from the `prototype` object in the function constructor.

Technically, when you call something like `"string".length`, the JavaScript engine runs the string through the function constructor to give you access to the `length` property.

**Note**: Numbers aren't automatically converted to a Number object like strings are.

### Dangers of built-in function constructors

You generally want to avoid built-in function constructors and opt to use **literals** instead (unless you absolutely can't avoid it).

This is because comparison and coercion get unintuitive with them:

```js
const a = 1;
const b = new Number(3);

a == b; // true because of coercion
a === b; // false because b is an object
```

**Note**: Built-in function constructors can be treated as regular functions without using `new`. This is good for **conversion** like `Number("3")`.

## Dangerous Aside: Arrays and for..in

Arrays are objects with indices as the names in their name/value pairs. That means this works:

```js
const arr = ["a","b"];

for (let i in arr) {
  console.log(i + ":", arr[i]); // logs 0: a etc.
};
```

However, if you add a property to `Array.prototype`, be careful that it will get added to the `for..in` loop!

```js
Array.prototype.foo = "bar";

// Will log foo: bar now
```

**Best practice**: Use the standard for loop to iterate over an array. `for..in` loops can mistakenly iterate down *into* the prototype chain.

## Object.create and Pure Prototypal Inheritance

The use of `new` and function constructors was a way to make JavaScript make more sense to developers used to classical inheritance.

The pure prototypal inheritance way to create objects is this:

```js
const person = {
  name: "Default",
  greet: function() { return "Hi " + this.name }
};

const dan = Object.create(person);
// Creates empty object with person as prototype

dan.name = "Dan";
// Then I overwrite what I want afterwards
```

### Polyfill

**Polyfill** is code that adds features that the engine may *lack*.

Here's an example polyfill for `Object.create`:

```js
// Checks if Object.create exists
if (!Object.create) {
  // Creates Object.create
  Object.create = function(o) {
    if (arguments.length > 1) {
      throw new Error("Object.create only accepts 1 parameter.");
    };

    // Sets constructor's prototype to object passed in and returns new empty object
    function F() {};
    F.prototype = o;
    return new F();
  };
};
```

## ES6 and Classes

**Classes** were introduced in ES6. However, they aren't templates/definitions like we're used to in other languages. Classes are still **objects**: they're objects that are used to create other objects!

They still have properties and methods like `constructor`.

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return "Hi " + this.name;
  }
};

const dan = new Person("Dan");
```

To set the `__proto__` of an object, just use `extends` and `super`:

```js
class Actor extends Person {
  constructor() {
    super();
    this.job = "actor";
  }
};
```

**Note**: `super` basically calls the constructor of its prototype!