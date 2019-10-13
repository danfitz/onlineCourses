—
categories: [frontend]
tags: [js]
title: "The Weird Parts of JavaScript 4: Objects and Functions"
—

## Objects and the Dot

Think of objects as sitting in memory with a reference address. Inside objects, there can then be references to other things sitting in memory too with their own addresses, which are connected to the original object. These can be primitive values, other objects, or functions—or properties and methods!

```js
const person = {};

person["key"] = "value";
```

When an object is created, the variable stores the memory address to where the object is stored. When you create a property, you use the **computed member access operator** or `[]` to create a new name/value pair. The value gets stored in that name in memory, and its memory address is given to the object.

Similarly, the **member access operator** does the same thing, but you can't dynamically choose the name in the object.

**Note**: Both member access operators are just functions that take the object and the name as arguments and then return the value stored at that name in the object.

## Framework Aside: Faking Namespaces

**Namespaces** are containers for variables and functions. They're used to keep variables and functions with the same names separate.

JavaScript can *fake* namespaces by storing variables and functions inside objects!

## JSON And Object Literals

In the past, people sent data across the internet using XML, which took this kind of format:

```
<object>
  <firstName>Mary</firstName>
  <isProgrammer>true</isProgrammer>
</object>
```

The problem is that XML has redundancies. Specifically, it has closing brackets that repeat the property name, which is a lot of wasted download bandwidth for large sets of data.

The solution: **JSON**. JSON is a subset of the object literal syntax with a few key differences.

```js
{
  "firstName": "Mary",
  "isProgrammer": true
}
```

Differences include:
* JSON's keys must be wrapped in quotes
* JSON's keys can't store functions

### Built-in methods for JSON

Technically, JSON isn't JavaScript. But because JSON is so similar to object literals, you can convert between them easily with these methods...

`JSON.stringify(objectLiteral);` takes an object literal and converts it to a JSON-formatted string.

`JSON.parse(jsonString);` takes a JSON-formatted string and converts it to an object in JavaScript.

## Functions are Objects

**Note**: Functions in JavaScript are **first-class functions**. Everything you can do with other data types you can do with functions: assign them to variables, pass them as arguments into other functions, and even create them on the fly anonymously.

When we say functions are objects, that means functions have:
* Ability to attach properties
* Ability to attach other objects
* Ability to attach methods

In addition, functions have special properties:
* **Name**: this is where the name of the function gets stored (doesn't exist if anonymous function)
* **Code**: this is where the code written inside the function gets stored (and also what gets run when you invoke the function)

## Function Statements and Function Expressions

### Expressions and statements

**Expressions** return a value. (That value doesn't necessarily have to be saved in a variable, but it can be). Examples:

```js
var a = 3; // assignment operator returns 3
1 + 2; // plus operator returns 3
```

**Statements** just do work; they run the code and that's it. Examples:

```js
if (true) { console.log("RUN")! }; // if statements just run;
var a = if (true) {}; // this doesn't return anything for a to store!
```

### Applied to functions

**Function statements** don't return a value; they just get stored in memory:

```js
// No value gets returned here
// It simply gets stored in memory during creation of execution context
function greet() {
  console.log("Hi");
};
```

**Function expressions** return a value, which you can store in a variable:

```js
// creates a function object
// Variable points to memory address of function object
var anonymousGreet = function() {
  console.log("Hi");
};
```
Important differences with function expressions:
* Function expressions are **anonymous**. They're not given a **name property**. Instead, function expressions have variable names that point to the anonymous function.
* Function expressions create an **object**. Function statements just store the code in memory.
* Function expressions are **NOT hoisted**. The execution context doesn't evaluate the right side of the equality operator, so you can't successfully invoke the function.

## Conceptual Aside: By Value vs. By Reference

**By value** is where the value itself is given when passing the value around, creating copies along the way.

```js
const a = 3; // value 3 gets stored in memory and a points to it
const b = a; // value 3 gets COPIED and stored in new place in memory and b points to new place
```

**By reference** is where the reference (or memory address) is given when passing the value around. No copies are created.

```js
const a = {}; // a points to this object in memory
const b = a; // b points to the same object
```

### Changing and comparing values

One side effect is that by value and by reference behave differently when you change the value.

```js
let a = 3;
let b = a;
a = 4;
console.log(a, b); // logs 4 and 3; b isn't affected by re-assignment

let a = {};
b = a;
a.greeting = "Hello";
console.log(b.greeting, a.greeting); // logs "Hello" twice; adding the property to a affects b too
```

## Objects, Functions, and this

Recall that `this` get defined every time an execution context is created.

When a function is created in the global object, `this` points to the global object:

```js
function logThis() {
  console.log(this); // logs global object
};
```

When a method is created in an object, `this` points to the object:

```js
const obj = {
  logThis: function() { console.log(this); } // logs obj
};

// Note: You're using an anonymous function expression to create the method!
```

When a function is created *inside* a method, `this` points to the global object again. **Many people consider this a bug**:

```js
const obj = {
  logThis: function() {
    const logDis = function() { console.log(this); };
    logDis(); // logs global object
  }
};

// SOLUTION: pass this by reference to hold onto it
const obj = {
  logThis: function() {
    const self = this; // pass by reference!
    const logDis = function() { console.log(self); };
    logDis(); // logs obj
  }
};
```

## Conceptual Aside: Arrays, Collections of Anything

Arrays can hold literally anything: strings, numbers, booleans, functions, objects, everything!

```js
const arr = [
  1,
  false,
  "hello",
  {},
  function() {}
];
```

## Arguments and Spread

### Arguments variable 

When a function is invoked, the JavaScript engine sets up the execution context. One special variable it sets up in this process is called the **arguments** variable.

```js
greet("Dan");

function greet(firstName, lastName, language) {
  language = language || "en"; // sets default value if one isn't provided

  console.log(firstName); // logs "Dan"
  console.log(lastName); // logs undefined
  console.log(language); // logs "en"

  console.log(arguments); // logs ["Dan", undefined, "en"]
};
```

**Note**: The JavaScript engine will hoist the parameters and give them an initial value of `undefined`.

**Note 2**: The `arguments` variable is **array-like**. It has some features of an array but not all. (Many people think this is a bug.)

### Spread operator

The `arguments` variable is being deprecated. The new way is the spread `...` operator.

```js
// ...arguments captures all the arguments in one variable
function greet(..arguments) {
  console.log(arguments);
};
```

## Framework Aside: Function Overloading

**Function overloading** is the ability to create multiple functions of the same name that each get called to perform different tasks depending on context. JavaScript *does not* have this feature.

The JavaScript workaround is to use functional programming and leverage the fact that functions are first-class (you can pass them into other functions):

```js
function greet(language) {
  if (language === "en") {
    console.log("Hello!");
  };

  if (language === "fr") {
    console.log("Bonjour !");
  };
};

// You're creating shorthand functions that do the parameter passing for you!
function greetEnglish() { greet("en"); };
function greetFrancais() { greet("fr"); };
```

The above pattern is often used by frameworks to **make using the framework easier**.

## Conceptual Aside: Syntax Parsers

The syntax parser will literally run through your code **character by character** and decide what you're going to do based on a strict set of rules.

Example is the `return` statement:

```js
r // syntax parser sees an r and expects return
re
ret
retu
retur
return;
```

The power of the syntax parser is it can **make changes** to the actual code you write.

## Dangerous Aside: Automatic Semicolon Insertion

Syntax parsers try to be helpful by *adding* semicolons for you. **You should always add your own semicolons because you don't want the syntax parser to do it**.

**Fun fact**: Semicolons are *not optional*, but the syntax parser makes it seem optional.

Example issue:

```js
function greet() {
  // Let's say you want to break your return statement into multiple lines...
  return
  {
    greeting: "Hello"
  };
};

console.log(greet()); // logs undefined
```

In the example above, the syntax parser sees a new line character after return. Seeing that, it thinks the return statement ends at that line, so it converts to `return;`, which ends the function!

The solution is to **always start with an opening bracket on the same line**. This ensures that the syntax parser knows to expect more further down.

```js
function greet() {
  return {
    greeting: "Hello"
  };
};
```

## Framework Aside: Whitespace

**Whitespace** are invisible characters that create literal space between your other characters. Includes returns, tabs, spaces.

## Immediately Invoked Function Expressions (IIFEs)

