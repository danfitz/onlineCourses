---
title: 'Function Purity'
part: 2
date: '2020-07-12'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Function Purity

## Functions vs. Procedures

Just because you use the `function` keyword doesn’t mean you’re creating a function.

A **procedure** is a collection of operations that you need to do in a program. It can accept **inputs**. A lot of the times, when you use the `function` keyword, you’re really just creating a procedure.

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
}

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

This function would technically be considered a function. However, it’s disingenuous to the _spirit_ of what a function is.

In particular, a function is about the **semantic relationship between inputs and outputs**. To understand this, we need to go back to functions in math.

```
f(x) = x^2
```

This function, if graphed along a coordinate plane, would end up being a parabola (like a U shape).

That coordinate plane is a visual representation of the relationship between inputs and outputs. Every x coordinate is an input, and every y coordinate is an output of that x coordinate. If x is 10, y is 100. If x is 0, y is 0. If x is -5, y is 25.

So if we go back to the `return20` example, there is no real relationship between inputs and outputs. In fact, any input will always output 20.

**Pro tip**: When naming a true function, the best name is one that communicates the _semantic relationship_ between inputs and outputs.

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

A function’s inputs and outputs must be **direct**. In the example above, they are _indirect_. These indirect changes are known as **side effects**.

**Note**: This applies specifically to _function calls_, not function definitions.

### Types of side effects

- Any sort of input/output (printing to console, changing files, etc.)
- Database storage
- Network calls
- DOM
- Generating timestamps
- Generating random numbers

The above list shows us that side effects are not completely avoidable. The goal instead should be to **minimize side effects as much as possible**. That’s not because side effects are bad. They’re necessary in any application. However, side effects water down or **impurify** the benefits of functional programming.

**Pro tip**: When we have to do side effects, make them as obvious as possible.

## Pure Functions & Constants

### Pure function definition (so far)

A **pure function** is basically a function in the spirit of functional programming:

- All inputs and outputs are direct
- Semantic relationship between inputs and outputs
- No side effects
- (Function call specifically)

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

As you can see, `z` is in the outer scope, but assuming this is the full program in front of us, we know it will never change throughout the lifetime of the program. Therefore, in a _practical sense_, `z` is a **constant** and therefore a direct input, and `addAnother` is a pure function.

But what about `const`? At first glance, `var` just feels wrong because it can be reassigned, while `const` is better to guarantee the value never changes. However, think about this: `addTwo` can be reassigned as well, yet we don’t treat it as a problem! That shows that what matters is that variables don’t change _in practice_ (not that they _can’t_ change).

### Value of pure functions

When we know there are no side effects in a program, we can analyze a snippet of code _without having to worry about any code before it_. Pure functions are **predictable** and **reliable**.

In the example above, suppose we don’t know if `z` is a side effect or not. In order to understand how the program runs, we have to mentally execute all the code before `addAnother` just to get up to speed with the state of the program. Only then can we assess `addAnother`.

In contrast, if we know `z` doesn’t ever change, we can focus on `addAnother` alone, trusting that nothing around it is affecting it. And what’s more is that we know `addAnother` won’t affect anything _else_ when _it_ executes.

## Reducing Surface Area

An even better way to approach the assignment of `z` would be to **reduce surface area**.

```js
function addAnother(z) {
  return function addTwo(x, y) {
    return x + y + z;
  };
}
```

In the example above, `z` is outside of the scope of `addTwo`. So is it a side effect? It turns out that it’s easy to answer that question because all we have to do is look at the lines of code inside `addAnother`: does `z` ever get reassigned? No, it doesn’t.

We are _reducing the surface area of the code that we have to analyze_. This pattern is a great way to increase confidence that you’re dealing with a pure function. Instead of having to read everything around `addAnother`, we only have to read what’s inside.

## Same Input, Same Output

Pure function calls also act in **isolation**: given the same inputs, we will always get the same outputs.

Here's an example of a function that fails this criterion:

```js
function getId(obj) {
  return obj.id;
}

getId({
  get id() {
    return Math.random();
  },
});
```

The reason we want same inputs, same outputs is that the reader can **trust** the code. They can move on without having to chase down if the code works as intended.

## Level of Confidence

In the end, function purity is about a **level of confidence**: it's a scale of degrees, not a binary evaluation.

It doesn't make sense to say, "This is pure" or "This is not pure". It's more accurate to say, "I have a high degree of confidence in this function".

## Impurity

If a function is not pure, what are our options?

1. Leave it impure but make it obvious that it is
   - **Note**: This makes sense for side effects you can't avoid like writing to a database
2. **Extract the impurity** from the function and make it its own procedure
   - **Example**: Before writing to a database, you usually perform computations. Instead of placing the computations _and_ side effect all into one function definition (making the whole thing impure), you can break it into 2 parts.
3. **Contain the impurity** (reduce its surface area) so as to minimize its potential effects on other parts of the application
   - A side effect that affects 5 lines of code is better than one that affects the global scope

### Extracting impurity

As stated, sometimes we can **extract impurity** by taking out the side effects and leaving behind a pure function.

Here's an example of a function definition with computations and side effects all packed together:

```js
function addComment(userId, comment) {
  const record = {
    id: uniqueId(), // random ID generation is a side effect
    userId,
    text: comment,
  };

  const elem = buildCommentElement(record);

  // DOM manipulation is a side effect
  commentsList.appendChild(elem);
}

addComment(55, 'This is a comment!');
```

What you want to do is refactor the function to extract out `uniqueId` and `appendChild`, as they are side effects.

```js
function newComment(userId, commentId, comment) {
  const record = {
    id: commentId,
    userId,
    text: comment,
  };
  return buildCommentElement(record);
}

const commentId = uniqueId();
const elem = newComment(55, commentId, 'This is a comment!');
commentsList.appendChild(elem);
```

Now `newComment` is a pure function. Instead of generating a unique ID, it accepts one as an argument. Additionally, instead of manipulating the DOM directly, it returns a DOM element ready to be appended.

Side effects are now in the _outer shell_, and you have a pure function you can rely on.

### Containing impurity

Another approach is to **contain impurity** within a small surface area of the code.

There are specifically 2 ways to contain impurity:

1. **Wrapper functions**
2. **Adapter functions**

To illustrate _wrapper functions_, imagine a function that performs side effects on a global-scoped array by mutating it:

```js
const numbers = [];

function insertSortedDesc(num) {
  let insertionIdx = numbers.findIndex(x => x <= num);
  if (insertionIdx === -1) {
    insertionIdx = numbers.length;
  }
  numbers.splice(insertionIdx, 0, num);
}

insertSortedDesc(4);
insertSortedDesc(2);
insertSortedDesc(1);
insertSortedDesc(3);
// numbers is [4, 3, 2, 1]
```

To contain the impurity of mutating `numbers`, we can wrap `insertSortedDesc` in another function and mutate a _copy_ of the array.

```js
let numbers = [];

function getSortedNums(nums, targetNum) {
  const copyNumbers = [...numbers];
  insertSortedDesc(targetNum);
  return copyNumbers;

  function insertSortedDesc(num) {
    // ...
  }
}
```

With our wrapper function refactor, all the impurity is _contained_ within the `getSortedNums` function. This mean less surface area to worry about!

---

_Adapter functions_ are more awkward to use, but here's how they work in pseudocode:

1. Store original global state in new variables.
2. Copy global state and assign copied version to original variables.
3. Call impure function, allowing the function to mutate the copy of global state.
4. Store mutated copied state in new variables.
5. Assign stored original global state back into original variables.
6. Return mutated copied state.

In other words, you're setting aside the original global state, replacing it with a copy, allowing the impure function to mutate that copy, and then returning the copy plus setting the original global state back in its place.

```js
let numbers = [];

function insertSortedDesc(num) {
  // ...
}

function getSortedNums(targetNum) {
  const originalNumbers = numbers;
  numbers = [...originalNumbers];

  insertSortedDesc(targetNum);

  const mutatedNumbers = numbers;
  numbers = originalNumbers;

  return mutatedNumbers;
}
```

**Caveat**: Adapter functions are much harder to use when there is a _lot_ of global state.
