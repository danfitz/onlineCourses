---
categories: [frontend]
tags: [js]
title: "The Weird Parts of JavaScript 2: Execution Contexts and Lexical Environments"
---

## Conceptual Aside: Syntax Parsers, Execution Contexts, and Lexical Environments

### Syntax parser

All JavaScript code you write has to be converted into instructions that the computer can understand. This is known as a **compiler** or **interpreter**. Part of a compiler or interpreter is a **syntax parser**: it goes through the code character by character to make sure that the syntax is valid.

The important point to remember is that the middle man compiler/interpreter can do **extra stuff** on top of convert code into machine instructions.

### Lexical environment

This is when **where** you write your code matters to how the code runs and is interpreted. For example, declaring a variable inside a function tells the syntax parser that it needs to live in a different part of memory.

### Execution context

The execution context is a wrapper that manages what is currently running (via some lexical environment). Because the syntax parser can include extra stuff, the execution context can include more than what you see in your written code.

## Conceptual Aside: Name/Value Pairs and Objects

### Name/value pairs

A name that maps to 1 unique value within any given execution context.

```js
const address = "100 Main St.";
```

Objects are literally just a *collection* of name/value pairs.

Some names can have other name/value pairs inside them. A great example of that is nested objects.

```js
const address = {
  street: "Main",
  number: "100",
  apartment: {
    floor: 3,
    number: 301
  }
}
```

## Global Environment and Global Object

Whenever JavaScript code is run, it's run *inside* an execution context. It *wraps* the currently executing code inside an execution context.

The *base* execution context is known as the **global execution context**.

The global execution context creates 2 things for you (you don't have to do it yourself in the code):
1. **Global object** - a collection of name/value pairs
2. **this** - a special variable

If you run an empty JS file, you'll notice that `this` and `window` still get created. This is some of that *extra stuff* that gets created without having to write it in code.

Inside browsers, the global object is `window`. Each tab of a browser has its own execution context and thus its own `window` object. (The global object will be something different if you run node.js for example.)

Notice that at the global level, `window` and `this` are **equal**. (This will change though.)

**Note**: "Global" just means "not inside a function".

### Name/value pairs inside global object

Add some variables to your empty JS file.

```js
var a = "Hello World!";

function b() {};
```

When you type `window` in the console, you'll see that `a` and `b` are name/value pairs *inside* the `window` global object!

Whenever a variable or function is not sitting inside a function, they're sitting right there inside the global object!

### Outer environment

The execution context will also create a link to the **outer environment**. This allows the execution context to reference things outside of itself.

However, this only works for code run *inside* a function. At the global level, there is no outer environment.

### Summary

The last thing the execution context will do is obviously **run your actual code**.

The important thing to note though is that the execution context creates a bunch of other things that **you never wrote**.

## Creation and Hoisting

In most programming languages, `b()` and `a` will throw an error below.

```js
b(); // Logs "Called b!"
console.log(a); // Logs undefined

var a = "Hello World!";

function b() {
  console.log("Called b!");
};
```

`b()` successfully calls the function. And `a` has been declared and can be referenced, but it hasn't been assigned! This phenomenon is called **hoisting**.

### How hoisting works in the execution context

There is a common error to think that hoisting is literally moving code up to the top of the page. This is technically wrong. The execution context does something more minute.

The execution context has 2 phases:

1. Creation phase
  * Creates global object
  * Creates `this`
  * Creates outer environment (if inside function)
  * **Hoisting**: sets up memory space for variables and functions

2. Code execution phase
  * Your actual code runs here
  * Assignment of variables is set here

Before your code even runs, variables and functions are put into memory! That means you can reference them **immediately**.

**Note**: Functions in their entirety are placed into memory, but variables are unique in that they're only declared in the creation phase. The actual assignment happens in the execution phase. That's why you see the placeholder `undefined`.

## Conceptual Aside: JavaScript and undefined

What do we mean by `undefined` in a hoisted variable?

**Answer**: `undefined` is a special value that actually takes up memory space! It exists! It's specifically used by JavaScript as the fallback if a value isn't set.

**Pro tip**: Never manually set a value to `undefined`. Allow values to only be `undefined` when the value isn't set, and JavaScript sets `undefined` for you. That helps you with debugging.

## Code Execution Phase

With the creation phase complete, the **code execution phase** is when your actual code runs.

```js
console.log(a); // logs undefined
var a;
a = "Hello World!";
console.log(a); // logs "Hello World!"
```

The first `console.log(a)` is a result of the creation phase and hoisting. The second one is a result of the actual code execution phase.

## Conceptual Aside: Single Threaded, Synchronous Execution

**Single-threaded** execution means **one command a time**.

**Synchronous** means **one at a time and in order**. It means that the code stops until the currently running command is complete.

## Function Invocation and the Execution Stack

**Function invocation** is running a function using parentheses `()`.

When you invoke/call a function, a **new execution context** is created and placed in the **execution stack**. (The execution context on the top is the one that's currently running.)

```js
function b() {
  var c;
};
function a() {
  b();
  var d;
};

a();
var e;
```

The execution stack goes like this:

* `b()` execution context
* `a()` execution context
* Global execution context

When `b()` finishes running, it gets **popped off** the execution stack, and then `a()` continues running, which also pops off the execution stack.

As a result, `var c;` runs first. Then `var d;`. Then `var e;`.

**Note**: All of this code runs **synchronously**. Nothing jumps ahead.

## Functions, Context, and Variable Environments

**Variable environment** just talks about where the variables live and how they relate to each other in memory.

Every execution context has its own unique variable environment.

```js
function b() {
  var myVar;
};

function a() {
  var myVar = 2;
  b();
};
var myVar = 1;
a();
```

Recall the execution stack:
* `b()`
* `a()`
* Global execution context

In this stack, `myVar` is part of a unique variable environment:
* In `b()`, `myVar` is `undefined`
* In `a()`, `myVar` is `2`
* In global, `myVar` is `1`

## The Scope Chain

Suppose you have this code below. What will `console.log(myVar)` print?

```js
function b() {
  console.log(myVar);
};

function a() {
  var myVar = 2;
  b(); 
};

var myVar = 1;
a();
```

**Answer**: `console.log(myVar)` will print `1`.

WHY?! Even though `b()` is on top of `a()` in the execution stack, they share the **same outer reference**: the global execution context. That's why `myVar` is `1`.

The reason for this goes back to the **lexical environment**: *where* the code is written determines its outer reference.

Even though `b()` is technically invoked inside `a`, what matters is that it's **lexically written** in the global execution context! As a result, the outer reference must be the global execution context!

The exact process is called the **scope chain**. `b()` looks for `myVar` in its own execution context. If `b()` can't find `myVar` inside itself, it looks at the outer reference defined by the lexical environment it was written in.

### Changing the lexical environment

An easy way to change the outer reference of function `b` is to declare it inside function `a`.

```js
function a() {
	function b() {
		console.log(myVar);
	}

	var myVar = 2;
	b();
}

var myVar = 1;
a();
```

Here's how the scope chain works now:
1. `b()` looks for `myVar` in its own execution context and finds nothing.
2. It then goes to its outer reference (defined lexically) in `a` and finds `myVar` is `2` there.
3. **BONUS**: If `myVar` isn't defined in function `a`, it will go to the outer reference of `a`, which is the global context, where `myVar` is `1`.

Shorthand trick to understand the scope chain and lexical environment and outer reference:
* Who created me?

## Scope, ES6, and let

**Scope** is where a variable is available in your code. All the ancillary terms like outer reference, variable environment, lexical environment, etc. are part of this!

### let

`let` allows the JavaScript engine to use what's called **block scoping**.

This means that when you declare a `let` variable inside curly braces `{}`, the variable is scoped to the contents of that block.

In contrast, `var` will attach the variable to the `window` object!

```js
if (true) {
  var a = 1;
  let b = 2;
};

console.log(window.a); // logs 1
console.log(b); // throws reference error
```

## What About Asynchronous Callbacks?

**Asynchronous** just means **more than one at a time**. Examples include promises, event listeners, etc.

Technically, the JavaScript engine itself is synchronous. However, the browser allows the JavaScript engine to *hook* into other features of the browser like the **rendering engine** or **HTTP requests**.

It's these hooks that are running asynchronously!

### The sequence of events in the browser

1. The execution stack builds as the code is executed top to bottom.
2. If at any point there's an asynchronous event, this gets added to the **event queue**: a way to remember that something has arrived and needs to be processed.
3. The execution stack runs until it's empty.
4. When empty, the JavaScript engine will look to see if there's events in the event queue.
5. If there's an event in the event queue, like a click event, it runs the callback function, which creates a new execution context!

Again, JavaScript is running synchronously, but the event queue is running asynchronously.

```js
// long running function
function waitThreeSeconds() {
    var ms = 3000 + new Date().getTime();
    while (new Date() < ms){}
    console.log('finished function');
}

function clickHandler() {
    console.log('click event!');   
}

// listen for the click event
document.addEventListener('click', clickHandler);


waitThreeSeconds();
console.log('finished execution');
```

The above code has an click event listener that only executes *after* the `waitThreeSeconds()` function finishes running. That's because **the execution stack takes priority over the event queue**!