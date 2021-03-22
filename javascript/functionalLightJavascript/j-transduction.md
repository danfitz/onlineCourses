---
title: 'Transduction'
part: 10
date: '2020-11-10'
categories: [compsci]
tags: [js]
source: [frontend masters]
---

# Transduction

Fusion only works if our data operations are all the same—all maps, all filters, or all reduces.

The trouble with combining any of these operations is that they have incompatible shapes:

- Mapper takes an item and returns another item
- Filter takes an item and returns a boolean
- Reducer takes 2 items and returns an accumulator

```js
nums.map(multiply2).filter(isEven).reduce(sumUp);
```

If we want to compose these operations together, this is known as **transduction**.

High-level, transduction works by **reshaping the functions** into compatible shapes that can be composed together. Specifically, it reshapes them all into _reducers_ because transduction is **composition of reducers**.

Here's how a functional programming library would perform transduction:

```js
const transducer = compose(filterReducer(isEven), mapReducer(multiply2));
```

Note how we don't pass the reducer `sumUp`. That's because a transducer is a _special_ type of reducer that only becomes a _regular_ reducer when you pass it a reducer as an _argument_. It's a **higher-order reducer**.

To do this, you use the utility function `transduce` and pass in the following:

- Transducer
- Combinator/reducer
- Initial value
- Data structure

```js
transduce(transducer, sumUp, 0, nums);
```

Alternatively, we can use `into`, which looks at the data type of the initial value and uses a default combinator.

```js
into(transducer, 0, nums);
```

- Numbers use an addition combinator
- Strings use a string concatenation combinator
- Arrays use a push combinator

**Note**: If the default combinators don't fit your use case, you want to use `transduce`.

## Deriving Transduction

Topics:

- Modeling mappers and filters as reducers
-

### Extracting reduce

How do you model a mapper and a filter as a reducer?

Let's look at the manual implementation using the array methods:

```js
function mapWithReduce(arr, mapper) {
  return arr.reduce(function reducer(list, v) {
    list.push(mapper(v));
    return list;
  }, []);
}

function filterWithReduce(arr, predicate) {
  return arr.reduce(function reducer(list, v) {
    if (predicate(v)) list.push(v);
    return list;
  }, []);
}

let list = [1, 2, 3];
list = mapWithReduce(list, multiply2);
list = filterWithReduce(list, isEven);
list.reduce(sumUp);
```

Instead of performing the reductions, let's now refactor `mapWithReduce` and `filterWithReduce` into functions that return the reducer itself.

```js
function mapReducer(mapper) {
  return function reducer(list, v) {
    list.push(mapper(v)); // hard-coded via closure
    return list;
  };
}

function filterReducer(predicate) {
  return function reducer(list, v) {
    if (predicate(v)) list.push(v); // hard-coded via closure
    return list;
  };
}

let list = [1, 2, 3];
list
  .reduce(mapReducer(multiply2), [])
  .reduce(filterReducer(isEven), [])
  .reduce(sumUp);
```

### Combiner and currying

In both reducers returned by `mapReducer` and `filterReducer`, there is a generic action happening: given `list` and `v`, these values are **combined** to return a new `list`.

We are going to create a generic `combiner` to and apply them to our specialized ones.

```js
function listCombine(list, v) {
  list.push(v);
  return list;
}

function mapReducer(mapper) {
  return function reducer(list, v) {
    return listCombine(list, mapper(v));
  };
}

function filterReducer(predicate) {
  return function reducer(list, v) {
    if (predicate(v)) return listCombine(list, v);
    return list;
  };
}

let list = [1, 2, 3];
list
  .reduce(mapReducer(multiply2), [])
  .reduce(filterReducer(isEven), [])
  .reduce(sumUp);
```

We can take this a step further and make `mapReducer` and `filterReducer` into **higher-order** reducers—i.e. **transducers**—by

- Moving the combiner to a parameter, and
- Currying the inputs.

```js
const mapReducer = curry(2, function mapReducer(mapper, combiner) {
  return function reducer(list, v) {
    return combiner(list, mapper(v));
  };
});

const filterReducer = curry(2, function filterReducer(predicate, combiner) {
  return function reducer(list, v) {
    if (predicate(v)) return combiner(list, v);
    return list;
  };
});
```

That way when we pass the mapper or the predicate into either `mapReducer` or `filterReducer` (respectively), we get back a higher-order reducer that _accepts_ a reducer in order to become a reducer.

```js
const mapTransducer = mapReducer(multiply2);
const filterTransducer = filterReducer(isEven);

let list = [1, 2, 3];
list
  .reduce(mapTransducer(listCombine), [])
  .reduce(filterTransducer(listCombine), [])
  .reduce(sumUp);
```

### Single reduce

### Composing transducers

If you notice, `mapTransducer` and `filterTransducer` now have the same shape: they both accept a reducer as an input and return a reducer as output. That means you can **compose** them!

```js
const transducer = compose(mapReducer(multiply2), filterReducer(isEven));

let list = [1, 2, 3];
list.reduce(transducer(listCombine), []).reduce(sumUp);
```

Effectively, what's happening is

1. `listCombine` gets passed as input to `filterReducer(isEven)`, generating a filter reducer
2. That filter reducer gets passed as an input to `mapReducer(multiply2)`, generating a map + filter reducer
   - In other words, the filter reducer becomes the `combiner` argument in `mapReducer`
   - So, `combiner(list, mapper(v))` takes a mapped value and then filters it

### Simplifying reducer inputs

Finally, now we have 2 reducers left. But how do we simplify it to just 1 reducer? Simple: just pass `sumUp` directly as the reducer. Why bother using the intermediary reducer `listCombiner` at all?

```js
const transducer = compose(mapReducer(multiply2), filterReducer(isEven));

let list = [1, 2, 3];
list.reduce(transducer(sumUp), 0);
```
