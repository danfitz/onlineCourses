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

## `useMemo` for Expensive Calculations

## `React.memo` for Reducing Re-renders

## Window Large Lists with react-virtual
