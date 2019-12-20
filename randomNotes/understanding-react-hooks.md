---
title: "Understanding React Hooks"
part: 1
date: "2019-12-20"
categories: [frontend]
tags: [react, js]
source: [reactjs.org]
---

# Understanding React Hooks

## Motivations for Hooks

There were 3 main considerations for introducing React hooks:

1. Adding reusable stateful logic to a component with ease
   * Patterns like higher-order components allow us to inject common stateful logic between components, but it leads to wrapper hell
   * React hooks give us a *primitive* for sharing stateful logic

2. Keeping mutually related code together
   * Mutually related code (e.g. code related to an API fetch) gets broken up and placed into different lifecycle methods
   * As components get more complex, you end up with unrelated code side by side and related code far and away from each other
   * React hooks let you *organize* your code based on what pieces are related rather than forcing a split based on lifecycle methods

3. Classes bring unnecessary complexity
   * Classes are confusing, especially because of `this`
   * Also, classes run into some optimization issues, which we want to dig ourselves out of before it becomes a real issue
   * React hooks give us all of React's core features *without* the need for a class

## useState

**Note**: When you `setState` via `useState`, the `state` variable gets **replaced**, not merged or updated. That means *objects* and *arrays* won't have the same references; they're brand new. (In contrast, `this.setState` **merges** values into a `this.state` object.)

```js
const [list, setList] = useState([1,2,3])

setList([4,5,6]) // <= REPLACES [1,2,3]
```

**Best practice**: Because you can use as many `useState` calls as you want *and* you can use objects and arrays as state, it's best to create unique state variables based on **which values tend to change together**. This helps with separation of concerns.

## useEffect

`useEffect` has the following basic structure:

```js
useEffect(() => { // <= Callback function that gets called *after* every render
  console.log('useEffect ran')

  return () => { // <= Cleanup function that gets called *before* every effect (but not first effect after first render)
    console.log('Cleanup for useEffect ran')
  }
})
```

**Note**: When a component **unmounts** in the above case, the cleanup function will run because it's *before* a potential re-render. However, the actual effect function won't run because an unmount doesn't count as a re-render.

Other things to know about `useEffect`:
* Every `useEffect` runs in the order in which they're invoked in your functional component.
* The effect function and cleanup function will run around *every* render. This leads to *fewer* bugs and cleaner code because it ensures consistent cleanup.
  * In contrast, class components have to use `componentDidUpdate` to perform the cleanup consistently.

### Skipping effects

Sometimes, for performance reasons, you don't want to apply the effect after *every* render. Instead, you only want to apply the effect when a specific value changes.

Class components do this by comparing `prevProps` or `prevState` to `this.props` and `this.state` respectively:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    // Perform effects conditionally
  }
}
```

`useEffect` does this by passing a dependency array:

```js
useEffect(() => {
  // Perform effects conditionally
}, [count])
```

React will compare the current value of `count` to its previous value. If there's a difference, the effect is applied.

**More about dependency array**:
* Make sure you pass *every* `props`, state, and any values *derived* from them that are used in `useEffect`.
  * **Pro tip**: When invoking a function, it's easier to see your dependencies if you define that function *inside* `useEffect`. This also means *NOT* having to include the function as a dependency.
  * It's only okay to omit a function from your dependency array if *nothing* in it uses `props`, state, and values derived from them.
  * **Alternative**: You can also use `useCallback` to ensure the function doesn't become stale.
* If the dependency array has multiple values, the effect will run if even just *ONE* value changes.
* **Important**: If you pass `[]` as the dependency array, the effect and cleanup functions will behave like `componentDidMount` and `componentWillUnmount`.

## Hooks Best Practices

Always call a hook at the **top level** of a functional component; never inside nested functions, conditional flows, or loops. This ensures that your hooks are always called in the **same order** during a re-render.

**Why**: React is only able to *remember* state across re-renders because it stores it in an **array**. If you include things like conditional logic, hooks won't always be in the same order, throwing everything off. Example:

```js
const [count, setCount] = useState(0)

if (count === 0) { // <= The second useState runs only on first render!
  setCount(count + 1)
  const [secondState, setSecondState] = useState(null)
}

const [thirdState, setThirdState] = useState(null) // <= THIS BREAKS on re-render because its position has shifted!
```

The only exception is **custom hooks**, where you can use a React hook inside!

## Custom Hooks

Custom hooks are an alternative to [higher-order components](https://reactjs.org/docs/higher-order-components.html) and [render props](https://reactjs.org/docs/render-props.html) in that they allow you to create custom reusable stateful logic.