---
title: 'Immutability'
part: 7
date: '2020-11-04'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Immutability

A misunderstanding about immutability is that it's about making sure things don't change. But you _want_ things to change in an application. Otherwise, what's the point in building an application if everything is static? State change is necessary and important.

So what is immutability? It's more accurate to say it's about making sure things don't change **unexpectedly**. It's about ensuring that if we do change something, it's **intentional** and **predictable**.

In other words, how do we **control mutation/change**?

## Assignment Immutability

**Assignment immutability** is the idea that if you assign a value to a variable or property, you are not able to reassign it.

A lot of functional programmers tout the `const` keyword as the way to implement assignment immutability.

This is problematic for 2 reasons:

1. Functional programmers try to avoid assigning variables at all and prefer to just pass values into functions. So how much does assignment immutability really matter?
2. Assignment immutability doesn't make data types like objects and arrays immutable. Those can still be mutated.
3. Most `const` assignments occur in a lexical scope, so their immutability is only linked to a small block of code. That's not that helpful.

## Value Immutability

99% of the problems with mutability can be solved with **value immutability**, not assignment immutability.

Take the following snippet of code:

```js
const orderDetails = {
  orderId: 42,
  total: basePrice + shipping,
};

// This is mutation!
if (orderedItems.length > 0) {
  orderDetails.items = orderedItems;
}

processOrder(orderDetails);
```

There may be mutation happening in `orderDetails`. How can we be sure whatever happens in `processOrder` is predictable now?

### `Object.freeze`

Most of the time when we want an immutable data structure, what we really want is a **read-only** data structure.

It turns out there's a built-in function called `Object.freeze` for just that purpose.

```js
processOrder(Object.freeze(orderDetails));
```

**Note**: `Object.freeze` is shallow, so it only freezes the first level of properties.

Some use cases:

- Establishing constant values like configurations
- When you get back an API response

### Copy, don't mutate

Even if some function calls pass `Object.freeze`, you can't be 100% sure every function call now and in the future will.

The solution is to make a copy of your data structure _before_ mutating it.

```js
function processOrder(order) {
  const processedOrder = { ...order };
  if (!('status' in order)) {
    processedOrder.status = 'complete';
  }
  saveToDatabase(processedOrder);
}
```

## Immutable data structures

As stated before, immutability is about making mutation predictable and structured. It doesn't mean the data structure can't change.

So, what does such an **immutable data structure** look like?

What you want is an API that creates a **layer of control** over your data structure. So, instead of directly changing the data structure, you do it through the API.

Specifically, that API will change the data structure by creating a _new_ data structure with your changes having been applied. You're changing a _copy_ and _replacing_ the original with it.

**Note**: Making a copy of your data structure every time there's a change can get expensive. A high-quality immutable data structure should handle those performance concerns for you.

**Pro tip**: Two great libraries for immutable data structures are Immutable.js and mori.
