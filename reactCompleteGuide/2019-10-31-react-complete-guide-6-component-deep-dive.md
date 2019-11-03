---
categories: [frontend]
tags: [react]
title: "React - Complete Guide 6: Component Deep Dive"
source: [udemy]
---

## Container vs. Presentational Components

Typically, **container components** or **components that manage state** like `App.js` shouldn't have a heavy `render` method, i.e., contain a lot of JSX. Container components should simply contain the **logic** and **state** and **state management** behind an application.

You then *pass* methods and values to child components, which perform the rendering. These child components make up the majority of your components and will usually be **presentational components**.

**Purpose**: You split your components into container and presentational to make your app more *manageable*.

## Component Lifecycle

**Lifecycle hooks** are functions that get invoked when certain events happen related to the class-based component.

Here are the phases of a component's lifecycle:
1. Creation
2. Update
3. Cleanup

### Creation phase

When a class-based component is created, the following methods run in order:

1. Component immediately invokes the `constructor` method. If you don't write your own `constructor` method, React will *automatically* invoke a default version for you. Therefore, you only write `constructor` when you want to customize its behaviour.
  * **Note**: If you create your own `constructor`, you need to pass `props` into `constructor(props)` and run `super(props)`. This is default behaviour that you now need to manually recreate.

2. Immediately afterwards, it invokes `getDerivedStateFromProps(props, state)`. You use this method to sync `state` to any `props` passed in from external sources.
  * **Note**: This method must return `state`.
  * **Note 2**: You won't use this often.

3. Then `render` method is invoked, returning JSX.
  * **Important**: `render` will invoke `render` for all child components too! That means the original `render invocation won't finish until the entire DOM tree has rendered.

4. Finally, `componentDidMount` is invoked.
  * This is where you implement **side effects**.

**Best practice**: Never implement **side effects** in any of these steps *except* `componentDidMount`. This includes HTTP requests, local storage, sending analytics to Google, etc. Side effects can trigger re-render cycles, which are bad for performance.

Deprecated lifecycle hooks at the creation phase:
* `componentWillMount` (replaced by `getDerivedStateFroProps`)

### Updating phase

When `state` or `props` changes, these methods are run in order:

1. `getDerivedStateFromProps(props, state)` is invoked again.

2. `shouldComponentUpdate(nextProps, nextState)` is where you can cancel the update process. You add code here to make a decision about whether the component should continue to evaluate and re-render.
  * Great for performance. Helps prevent *unnecessary* updates.
  * **Note**: This method must return `true` or `false`. By default, it always returns `true`.

3. `render` then gets called, constructing the virtual DOM.
  * **Important**: This will update all your child components' `props`, triggering an update cycle for *them* too.

4. `getSnapshotBeforeUpdate(prevProps, prevState)` is where you do last minute things *before* the update is complete like DOM operations. For example, maybe you want to grab the user's current scrolling position.
  * **Note**: This method must return what's called a **snapshot**, which gets passed as an argument to `componentDidUpdate`.

5. Finally, you end with `componentDidUpdate(prevProps, prevState, snapshot)`. You add **side effects** here.

Deprecated lifecycle hooks at the updating phase:
* `componentWillReceiveProps(props)`
* `componentWillUpdate`

### Cleanup phase

Sometimes you have things like event listeners that you have to cleanup when a component is removed from the DOM. To do this, use `componentWillUnmount` to add any custom code you want to run to perform the cleanup.

### Lifecycle in Functional Components

### useEffect

`useEffect` is a React hook that you invoke inside a functional component that takes a callback function. The callback function gets invoked *every time* the component is rendered and re-rendered.

This mimics `componentDidMount` and `componentDidUpdate` pretty closely!

```js
import React, { useEffect } from "react";

const Component = () => {
  useEffect(() => {
    console.log("I run every time I'm rendered");
  });

  return <p>I'm a functional component</p>;
};
```

**Note**: You can invoke as many `useEffect` methods as you want in your functional component.

### Conditionally using useEffect

To mimic `componentDidUpdate` alone, `useEffect` takes a second argument after a callback that takes an array of variables that it watches. *IF* those variables change during a render cycle, then it will invoke the callback. Otherwise, it won't.

To mimic `componentDidMount` alone, we add an empty array as the second argument of `useEffect`.

```js
useEffect(() => {
  console.log("I run conditionally");
}, [props.key]);

useEffect(() => {
  console.log("I run only on first render");
}, []);
```

### Performing cleanup with useEffect

Any cleanup work is done by returning a function containing your cleanup code inside `useEffect`.

```js
useEffect(() => {
  console.log("useEffect rendering...");
  
  const timer = setTimeout(() => {
    console.log("Here's a fake API call!");
  }, 1000);

  return () => {
    console.log("useEffect about to re-render. Cleanup here...");

    clearTimeout(timer); // clears timer!
  }
});
```

**Note**: The returned cleanup method always runs **before** a re-render. That means it never runs on the first render cycle. It only runs *before* the next render cycle.

### Dependencies in useEffect

There are 3 possible behaviours that useEffect can have depending on what you pass in the second argument:

* No dependencies
  * Both the `useEffect` callback AND the returned cleanup method will run on *every* re-render.
* `[]` or empty array
  * `useEffect` callback run on first render only. Cleanup method runs before second re-render, which is actually an *un-render*.
* `[foo, bar]` or dependencies
  * `useEffect` callback and cleanup method run *if* the dependencies changed.

## Virtual DOM Optimization

### Optimization with componentShouldUpdate

Every time `state` or `props` changes, that triggers a full re-render of the virtual DOM. This has performance costs we can recuperate using `shouldComponentUpdate`.

A great use case is container components re-rendering child components. By default, this *always* happens because child components get rendered recursively. However, there are many times when child components don't *need* to be re-rendered because nothing important changed for them.

In the example below, `toggle` gets changed on button click, but the `Child` is only affected when `arr` changes. This leads to redundant re-rendering of `Child`.

```js
class App extends Component {
  state = {
    toggle: false,
    arr: ["Dan", "John", "Barbara"]
  };

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ toggle: !this.state.toggle })}>Toggle</button>
        <button onClick={() => this.setState({ arr: [...this.state.arr].push("Bibi")})}>Add Bibi</button>
        <Child arr={this.state.arr} />
      </div>
    );
  };
};
```

We only care if `arr` changes. The solution is to use `shouldComponentUpdate` to compare the *reference* between the old `arr` and new `arr`.

```js
class Child extends Component {
  // Child only re-renders when arr changes reference
  shouldComponentUpdate(nextProps) {
    return nextProps.arr !== this.props.arr; // reference comparison
  };
  render() {
    return <p>{this.props.arr}</p>;
  };
};
```

**Note**: The reason reference comparison works is that we created a copy of `arr` using the spread operator, i.e., `[...this.state.arr]`.

**Pro tip**: You can use the prototype `PureComponent` instead of `Component` too. `PureComponent` has `shouldComponentUpdate` built in, running a shallow comparison of all `props` and `state`.

### Optimization with React.memo

`React.memo` performs **memoization** on your functional components, storing a cache of the component. The component will then *only* re-render if its inputs change, i.e. `props`. This minimizes unnecessary re-renders.

```js
const child = props => {
  return <p>{props.description}</p>;
};

export default React.memo(child); // THE MAGIC HAPPENS HERE
```

Recall that by default, when a parent component re-renders, it will re-render all its children too. So if, say, `this.state.title` changes, `child` will still re-render.

`React.memo` solves this. Now, `child` will only re-render when `props.description` changes.

### When should you optimize?

`shouldComponentUpdate` and `React.memo` still run code. That means they have computing costs. In cases where the child component *always* needs to update when the parent updates, those computing costs aren't worth it. You're better off defaulting to always re-rendering.

**Best practice**: Only apply `shouldComponentUpdate` and `React.memo` to components that *unnecessarily* re-render.

## How React Updates the DOM

The basis of React is that it only updates the real DOM when it detects changes. Updating the real DOM is computationally expensive, so minimizing such changes is valuable. Here's how DOM changes happen in React:

1. When React invokes the `render` method, it creates a virtual DOM.
2. On a re-render, React compares the current virtual DOM with the new virtual DOM.
3. If any differences are detected, those differences lead to real DOM updates *only* for the elements affected.

**Note**: `shouldComponentUpdate` and `React.memo` stop short this entire process because even this process has computational costs (though much less than updating the real DOM).

## Adjacent JSX Elements

There are at least 2 ways to return adjacent JSX elements:

1. `return` an array of JSX elements *with keys* for each element.

```js
const component = props => {
  return [
    <h1 key="title">Component</h1>,
    <p key="description">I do stuff!</p>
  ];
};
```

The problem with the array solution is that it's tedious to have to add a key.

2. Create an `Auxiliary` component that wraps around your adjacent JSX elements.

```js
const Auxiliary = props => props.children;

const component = props => {
  return (
    <Auxiliary>
      <h1>Component</h1>
      <p>I do stuff!</p>
    </Auxiliary>
  );
};
```

**Explanation**: React doesn't allow adjacent JSX elements because `return` must return a single expression, and adjacent `React.createElement` calls are multiple expressions. 