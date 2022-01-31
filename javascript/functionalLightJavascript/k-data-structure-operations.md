---
title: 'Data Structure Operations'
part: 11
date: '2020-11-12'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Data Structure Operations

We're now going to take map, filter, and reduce and think about them at the more general data structure level (not just arrays).

## Monads

**Monads** are **functional-friendly data structures**.

As data structures, monads hold one discrete value. The point of doing this is to wrap behaviour around that value, making that value easier to inter-operate with other monads.

Specifically, monads turn values into **functors**: values that you can transform (map), include (filter), and combine (reduce).

### Implementing the just monad

High-level, a monad in implementation is just a function that is passed a value and returns these methods (and more): `map`, `chain`, and `ap`. These methods can then be used to access and work with the closed-over value passed in.

```js
function Just(val) {
  return { map, chain, ap };

  // - Applies function to value
  // - Returns another monad
  // - Just like how mapping over an array,
  // returns an array, mapping over a monad returns a monad
  function map(fn) {
    return Just(fn(val));
  }

  // - Sometimes called bind or flatMap
  // - Flattens a monad
  // - For simplicity, we return mapped value without wrapping monad
  function chain(fn) {
    return fn(val);
  }

  // - Calls the map of another monad
  // - Requires the value passed in to be a function
  function ap(anotherMonad) {
    return anotherMonad.map(val);
  }
}
```

These monadic behaviours obey 3 monadic rules. (We won't go into the rules though.)

Here's some use cases to wrap your head around how it works:

```js
const ten = Just(10);
const eleven = ten.map(x => x + 1);

ten.chain(x => x); // 10
eleven.chain(x => x); // 11

// -----

const user1 = Just('Dan');
const user2 = Just('John');

const tuple = curry(2, (x, y) => [x, y]);

// The map method returns a monad with the curried tuple waiting for 1 more input
// The ap method takes that curried tuple and passes the last input via user2.map
const users = user1.map(tuple).ap(user2);

users.chain(x => x); // ["Dan", "John"]
```

**Note**: We are cheating when we pass the identity function to `chain`. The only acceptable function for a `chain` is a function that returns a monad. That's because returning the value inside the monad is considered a _side effect_.

## The maybe monad

One of the most common use cases for monads is the **maybe monad**. This monad solves the problem of accessing deeply nested object properties where you don't know if you'll get back `undefined` for any of those properties.

To start, you need a `Nothing` monad that continually returns back more `Nothing` monads. We'll use this monad if we hit `undefined`.

```js
function Nothing() {
  return { map: Nothing, chain: Nothing, ap: Nothing };
}
```

Now we want to create our `Maybe` monad and our `prop` helper function.

```js
const Maybe = { Nothing, of: Just };

// Returns either a Nothing or a Just monad
function fromNullable(val) {
  if (val === null || val === undefined) return Maybe.Nothing();
  return Maybe.of(val);
}

// Passes property value to fromNullable
const prop = curry(2, function (key, obj) {
  return fromNullable(obj[key]);
});
```

Finally, we can access our deeply nested property by chaining `chain`.

```js
Maybe.of(obj)
  .chain(prop('someProp'))
  .chain(prop('thatIsNested'))
  .chain(prop('prettyDeeply'));
```

**Note**: This works because `prop` is curried, so it's waiting for an object to be passed into it before it is invoked. And `chain` passes that object. Then the `Just` monad returned with that property value closed over it calls `chain` again.

If at any point `fromNullable` finds a property that returns `undefined` or `null`, it returns a `Nothing` monad, making all future chains return a `Nothing` monad as well.

## More on Monads

Here are some kinds of monads:

- Just
- Nothing
- Maybe
- Either
- IO
