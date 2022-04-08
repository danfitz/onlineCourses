---
title: 'React Performance'
part: 5
date: '2021-07-28'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# React Performance

## Code Splitting

We already know that it's possible to code split React components using `React.lazy` and `Suspense`:

```js
const BigComponent = React.lazy(() => import('../bigComponent'));

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <React.Suspense fallback='Loading...'>
        {show && <BigComponent />}
      </React.Suspense>
    </>
  );
};
```

The code for `BigComponent` is now only fetched when the user clicks the "Show" button.

### Eager loading

In the above example, what happens if clicking that button causes the `fallback` to hang for too long? (Maybe the component is really big.)

To solve this, we can perform more **eager loading** by placing the dynamic import in a function. This gives us the ability to load `BigComponent` imperatively.

```js
const loadBiggie = () => import('../bigComponent');
const BigComponent = React.lazy(loadBiggie);

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)} onMouseEnter={loadBiggie}>
        Show
      </button>
      <React.Suspense fallback='Loading...'>
        {show && <BigComponent />}
      </React.Suspense>
    </>
  );
};
```

In this refactor, we `loadBiggie` when the user hovers over the "Show" button, which means the load happens sooner, leading to a smoother user experience.

**Pro tip**: `loadBiggie` could get invoked multiple times by the user, but that's okay because bundlers like webpack come with **caching** of dynamic imports. So, the browser won't repeatedly fetch `BigComponent`. It will just give you back the results of the initial fetch.

### Prefetching

When you `prefetch` a chunk of JS, that means the browser will automatically load the code for you as soon as it has a spare moment.

This feature is best implemented when you want to lazy load some code that you're very confident the user will use right away. So this code is fetched _after_ all the necessary code but _before_ the user is likely to interact with it.

You can add this functionality through webpack by adding a `/* webpackPrefetch: true */` comment in your dynamic import.

```js
import(/* webpackPrefetch: true */ '../bigComponent');
```

### Position of `React.Suspense`

Every lazily loaded component inside a `React.Suspense` renders the same `fallback`. In other words, `React.Suspense` is shared.

```js
const App = () => (
  <React.Suspense fallback='Loading...'>
    <LazyComponent1 />
    <LazyComponent2 />
  </React.Suspense>
);
```

When you wrap a bunch of children inside `React.Suspense` and a component starts lazily loading, _everything_ inside of `React.Suspense` gets replaced by `fallback`. This includes any components that aren't lazily loaded as well.

```js
const App = () => (
  <React.Suspense fallback='Loading...'>
    <h1>This heading disappears while LazyComponent loads</h1>
    <LazyComponent />
  </React.Suspense>
);
```

**Best practice**: Try to keep `React.Suspense` wrapped around the components that actually are related to the lazy loading.

```js
const App = () => (
  <>
    <h1>This heading disappears while LazyComponent loads</h1>
    <React.Suspense fallback='Loading...'>
      <LazyComponent />
    </React.Suspense>
  </>
);
```

**Pro tip**: You can manually display the `fallback` for a component by selecting your lazy component and clicking the stopwatch icon in React DevTools.

## `useMemo` for Expensive Calculations

## `React.memo` for Reducing Re-renders

## Window Large Lists with react-virtual
