---
title: 'Function Purity'
part: 2
date: '2019-07-12'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Function Purity

## Functions vs. Procedures

Just because you use the `function` keyword doesn’t mean you’re creating a function.

A **procedure** is a collection of operations that you need to do in a program. It can accept **inputs**. A lot of the times, when you use the  `function` keyword, you’re really just creating a procedure.

So what is a function? A function must take inputs and **return outputs**.

```js
// Procedure
function printNumber(n) {
	console.log(n);
}

// Function
function add2(n) {
	return n + 2;
}
```

However, a function also must **always only call other functions**. The moment it calls a procedure, it becomes a procedure too.

```js
// Calling a procedure makes it a procedure
function printAdd2(n) {
	printNumber(add2(n));
};

// Calling a function keeps it a function
function doubleAdd2(n) {
	return add2(add2(n));
}
```

Getting clear about what makes a function a function matters because **something must be a function in order to take advantage of functional principles**.

## Semantic Relationship Between Inputs and Outputs

Technically, you could make a function like this:

```js
function return20() {
	return 20;
}
```

This function would technically be considered a function. However, it’s disingenuous to the *spirit* of what a function is.

In particular, a function is about the **semantic relationship between inputs and outputs**. To understand this, we need to go back to functions in math.

```
f(x) = x^2
```

This function, if graphed along a coordinate plane, would end up being a parabola (like a U shape).

That coordinate plane is a visual representation of the relationship between inputs and outputs. Every x coordinate is an input, and every y coordinate is an output of that x coordinate. If x is 10, y is 100. If x is 0, y is 0. If x is -5, y is 25.

So if we go back to the `return20` example, there is no real relationship between inputs and outputs. In fact, any input will always output 20.

**Pro tip**: When naming a true function, the best name is one that communicates the *semantic relationship* between inputs and outputs.

## Side Effects

We need to keep expanding our understanding of what a function is though. Technically, if our current criteria were enough, this would be a function:

```js
const a = 1;
const b = 2;
let sum;

function addAB() {
	sum = a + b;
}
```

This “function” technically accepts inputs (defined earlier) and return outputs, and there is a semantic relationship going on. However, this isn’t a function. Why?

A function’s inputs and outputs must be **direct**. In the example above, they are *indirect*. These indirect changes are known as **side effects**.

**Note**: This applies specifically to *function calls*, not function definitions.

### Types of side effects

* Any sort of input/output (printing to console, changing files, etc.)
* Database storage
* Network calls
* DOM
* Generating timestamps
* Generating random numbers

The above list shows us that side effects are not completely avoidable. The goal instead should be to **minimize side effects as much as possible**. That’s not because side effects are bad. They’re necessary in any application. However, side effects water down or **impurify** the benefits of functional programming.

**Pro tip**: When we have to do side effects, make them as obvious as possible.

## Pure Functions & Constants

### Pure function definition (so far)

A **pure function** is basically a function in the spirit of functional programming:
* All inputs and outputs are direct
* Semantic relationship between inputs and outputs
* No side effects
* (Function call specifically)

### Constants

It turns out that when we say a function’s inputs are direct, that doesn’t mean the values need to be passed as arguments. They can be in the outer scope and still respect functional principles:

```js
var z = 1;
function addTwo(x, y) {
	return x + y;
}
function addAnother(x, y) {
	return addTwo(x, y) + z;
}
```

As you can see, `z` is in the outer scope, but assuming this is the full program in front of us, we know it will never change throughout the lifetime of the program. Therefore, in a *practical sense*, `z` is a **constant** and therefore a direct input, and `addAnother` is a pure function.

But what about `const`? At first glance, `var` just feels wrong because it can be reassigned, while `const` is better to guarantee the value never changes. However, think about this: `addTwo` can be reassigned as well, yet we don’t treat it as a problem! That shows that what matters is that variables don’t change *in practice* (not that they *can’t* change).

### Value of pure functions

When we know there are no side effects in a program, we can analyze a snippet of code *without having to worry about any code before it*. Pure functions are **predictable** and **reliable**.

In the example above, suppose we don’t know if `z` is a side effect or not. In order to understand how the program runs, we have to mentally execute all the code before `addAnother` just to get up to speed with the state of the program. Only then can we assess `addAnother`.

In contrast, if we know `z` doesn’t ever change, we can focus on `addAnother` alone, trusting that nothing around it is affecting it. And what’s more is that we know `addAnother` won’t affect anything *else* when *it* executes.

**Pro tip**: An even better way to approach the assignment of `z` would be to **reduce surface area**.

```js
function addAnother(z) {
	return function addTwo(x, y) {
		return x + y + z;
	}
}
```

In the example above, `z` is outside of the scope of `addTwo`. So is it a side effect? It turns out that it’s easy to answer that question because all we have to do is look at the lines of code inside `addAnother`: does `z` ever get reassigned? No, it doesn’t.

We are *reducing the surface area of the code that we have to analyze*. This pattern is a great way to increase confidence that you’re dealing with a pure function. Instead of having to read everything around `addAnother`, we only have to read what’s inside.

## Same Input, Same Output