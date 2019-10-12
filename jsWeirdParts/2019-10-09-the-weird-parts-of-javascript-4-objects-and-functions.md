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