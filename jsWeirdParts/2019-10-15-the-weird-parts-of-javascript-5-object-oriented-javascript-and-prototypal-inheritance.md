---
categories: [frontend]
tags: [js]
title: "The Weird Parts of JavaScript Module 5: Object-Oriented JavaScript and Prototypal Inheritance"
---

## Conceptual Aside: Classical vs. Prototypal Inheritance

**Inheritance** where one object gets access to the properties and methods of another object.

**Classical** inheritance is the way that most programming languages handle inheritance. It's very robust but can get extremely complicated and intertwined.

**Prototypal** inheritance is used by JavaScript, and it's often much easier to understand.

## Understanding the Prototype

All objects in JavaScript have a **prototype** property. The prototype property is a **reference** to another object.

Suppose I have an object with a property:

```js
const obj = {
  prop1: "Hello!"
};

obj.prop1; // "Hello"
obj.prop2; // What does this do?
```

When you reference an object property, there's a search order:
1. The JavaScript engine first looks in the object itself.
2. If it can't find the property, it then looks inside its prototype for the property name.
3. If it can't find it there, it looks inside the prototype's prototype, etc., etc.

This is known as the **prototype chain**.

**Note**: Notice that you don't have to *manually* reference the prototype. The JavaScript engine will automatically search down the prototype chain.

### Accessing the prototype

You can directly set and access an object's prototype like this:

```js
const person = {
  name: "Default",
  logName: function() { console.log(this.name) }
};

const dan = {
  name: "Dan"
};

// THIS TECHNIQUE IS NOT PERFORMANT! DON'T EVER USE IT!
dan.__proto__ = person;

// Now this works...
dan.logName(); // logs "Dan"
```

**Note**: `this` correctly references `dan`, even though it's coming from the prototype `person`.

**Note 2**: Notice that `name` in `dan` overrides `name` in `person`. That's because the prototype chain *starts* at the original object and stops searching when it finds the property.

## Everything Is An Object (or A Primitive)

Everything in JavaScript reduces down to the **base object prototype**.

```js
cons obj = {};
obj.__proto__; // Base object

const fn = function() { };
fn.__proto__; // Empty object containing apply, bind, call, etc.
fn.__proto__.__proto__; // Base object

const arr = [];
arr.__proto__; // Array object containing map, filter, length, etc.
arr__proto__.__proto__; // Base object
```

## Reflection and Extend

**Reflection** is an object's ability to look at and change its own properties and methods.

```js
const obj = {
  prop1: 1,
  prop2: 2
};

// We can access the properties of an object!
for (let prop in obj) {
  if (obj.hasOwnProperty(prop)) console.log(obj[prop]);
};
```

**Extend** is a useful code pattern that is an alternative to the prototype chain for combining and composing objects. Instead of inheriting properties and methods through the prototype chain, you can *directly* add new properties and methods through reflection.

```js
// From underscore.js
_.extend(obj, { prop3: 3 });
```

The above method takes `obj` and adds properties from all objects after it to `obj`. That means `obj` will now have `prop3`.