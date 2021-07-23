---
title: 'Advanced React Patterns'
part: 4
date: '2021-07-20'
categories: [frontend]
tags: [js, react]
source: [epic react]
---

# Advanced React Patterns

## Context Module Functions

**Context module functions** are basically helper functions you build to provide a more clean API for users who consume your custom contexts.

For example, suppose you have a `CounterProvider` where a common use case is to `increment` and `decrement` the `count` inside of that context.

You could write context module functions like this...

```js
const CounterContext = React.createContext();

const CounterProvider = ({ initialCount = 0, ...props }) => {
  const [count, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
    }
  }, initialCount);

  // Context module functions!
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement ' });

  const value = { count, increment, decrement };

  return <CounterContext.Provider value={value} {...props} />;
};

const MyCount = () => {
  const { count, increment } = React.useContext(CounterContext);

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>increment</button>
    </>
  );
};
```

However, there are few limitations with the above approach:

- You can't place `increment` and `decrement` into dependency lists for `useEffect` or `useCallback` _unless_ you memoize them by wrapping them in `useCallback`. Otherwise, the function reference will change on every re-render, leading to unintended side effects.
- Because the context module functions live _inside_ of `CounterProvider` (or in a `useCounter` hook you could create), you can't **tree shake**, **code split**, or **lazily load** them.

To solve this problem, your context module functions can accept `dispatch` as as an argument, so it can live outside of your React components.

```js
const CounterContext = React.createContext();

const CounterProvider = ({ initialCount = 0, ...props }) => {
  const [count, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
    }
  }, initialCount);

  const value = [count, dispatch];

  return <CounterContext.Provider value={value} {...props} />;
};

// Context module functions!
const increment = dispatch => dispatch({ type: 'increment' });
const decrement = dispatch => dispatch({ type: 'decrement' });

const MyCount = () => {
  const [count, dispatch] = React.useContext(CounterContext);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => increment(dispatch)}>increment</button>
    </>
  );
};
```

In this pattern, you continue to give the user direct access to `dispatch` in context. However, to make their lives easier, you provide them with common operations in the form of context module functions.

These functions accept `dispatch` as an argument, so they can interact with context without being directly involved with it (like defined inside of a provider or custom hook).

In doing so, these helper functions don't have to worry about memoization, and they can be easily tree shaken, code split, and lazily loaded as well!

## Compound Components

**Compound components** are components that work together to form a complete UI. In HTML, think of the combination of `select` and `option`:

```html
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

`select` and `option` can't be used separately, but _together_ they form a dropdown input.

More specifically, `select` handles the management of state of the UI, while `option` handles configuration for how the select should operate (its options and their values).

### A naive React implementation

In React world, if we wanted to create a `select` and `option`, it's common to create a `CustomSelect` with an `options` prop:

```js
// This component would implement `select` and `option`s behind the scenes
<CustomSelect
  options={[
    { value: '1', display: 'Option 1' },
    { value: '2', display: 'Option 2' },
  ]}
/>
```

The trouble comes when we want to extend our `CustomSelect`. Maybe we need to add additional attributes to the `option`s rendered. Or maybe we need the `display` to change style based on whether it's selected.

We could add to the API surface area by introducing more props, but that just means more to code and more for users to learn! (This could blow up and get very messy in a real-world application.)

### Compound components as a solution

Suppose we want to create a `Toggle` that contains a toggle button and that shows different content when the toggle is on vs. when it's off.

In a compound components approach, it would look something like this:

```js
<Toggle>
  <ToggleOn>Content that appears when toggle is on</ToggleOn>
  <ToggleOff>Content that appears when toggle is off</ToggleOff>
  <ToggleButton />
</Toggle>
```

`Toggle` should manage the state (just like `select` does). But how do we work with that state inside of `ToggleOn`, `ToggleOff`, and `ToggleButton`? From the perspective of the user, we don't see any of the state sharing.

**Answer**: You can **implicitly pass props** to the children of `Toggle` using a combination of `React.Children.map` and `React.cloneElement`.

```js
const Toggle = ({ children }) => {
  // Internal state management
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return React.Children.map(children, child => {
    // Built-in DOM components
    if (typeof child.type === 'string') return child;
    // Custom composite components
    return React.cloneElement(child, { on, toggle });
  });
};

const ToggleOn = ({ on, children }) => (on ? children : null);
const ToggleOff = ({ on, children }) => (!on ? children : null);
const ToggleButton = ({ on, toggle }) => <Switch on={on} onClick={toggle} />;
```

There's a few things going on in the code above:

- `Toggle` manages the `on` state and creates a helper function `toggle` for switching that state.
- We map over `children` using `React.Children.map`. (This is required when mapping over React components. A simple `Array.map` wouldn't do.)
- If the child is a DOM component like `<div />` or `<span />`, we just return it.
- Otherwise, we clone the child with `React.cloneElement` and pass along the internal state of `Toggle` to the child in the form of props.
- Finally, the child components just access the props `on` and `toggle` that we passed like normal.

**Pro tip**: One concern with this approach is that a user could create a `CustomToggleButton` that accepts `on` and `toggle` props, and `Toggle` _will_ pass those props along. If you want to stop this, you can just create a `allowedTypes` array to filter out components that you don't want to share internal state with.

```js
const allowedTypes = [ToggleOn, ToggleOff, ToggleButton];

const Toggle = ({ children }) => {
  return React.Children.map(children, child => {
    // Don't pass along internal state to children that we don't allow
    // Added benefit of this is it also handles the built-in DOM components too!
    if (!allowedTypes.includes(child.type)) return child;

    return React.cloneElement(child, { on, toggle });
  });
};
```

## Flexible Compound Components

What happens if you want to wrap your compound components inside your own custom parent components (like for style reasons)? In other words, how do you share state with compound components that are _grandchildren_?

```js
<Toggle>
  <ToggleOn>Content that appears when toggle is on</ToggleOn>
  <ToggleOff>Content that appears when toggle is off</ToggleOff>
  <div>
    <ToggleButton />
  </div>
</Toggle>
```

**Answer**: Use **context**!

```js
const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

const useToggle = () => {
  const context = React.useContext(ToggleContext);
  if (!context) {
    throw new Error('You must wrap your components in <Toggle />');
  }
  return context;
};

// Children now access internal state using context (not props passing)!
function ToggleOn({ children }) {
  const { on } = useToggle();
  return on ? children : null;
}
function ToggleOff({ children }) {
  const { on } = useToggle();
  return on ? null : children;
}
function ToggleButton(props) {
  const { on, toggle } = useToggle();
  return <Switch on={on} onClick={toggle} {...props} />;
}
```

Now you can nest your `Toggle` child components as deep as you want, and they should still work.

## Prop Collections and Getters

### Prop collections

**Prop collections** are basically just objects of props that you maintain for components that have a lot of props you need to keep track of. Common components that would benefit from prop collections are complex interactive elements like toggles or accordions. These components usually require props like `onClick`, `onKeyDown`, `onFocus`,`aria-pressed`, `aria-expanded`, etc.

The basic idea with prop collections is that you pass them to the user, so they can spread the props over UI components. The benefit of this approach is that the user doesn't have to wire it all up themselves. Returning to the `Toggle` case:

```js
const useToggle = () => {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // We maintain a list of common props needed for the toggler
  // This can expand as requirements get added
  const togglerProps = {
    'aria-pressed': on,
    onClick: toggle,
  };

  return { on, toggle, togglerProps };
};

const App = () => {
  const { togglerProps } = useToggle();

  return (
    <Toggle>
      <ToggleOn />
      <ToggleOff />
      <button {...togglerProps}>Toggle</button>
    </Toggle>
  );
};
```

### Prop getters

Just like prop collections, **prop getters** help you maintain a list of common props for your UI components. However, they are functions that _return_ props, so you can allow your user to extend, customize, and combine props.

For example, suppose the user needs to trigger analytics when the toggle button is pressed.

```js
const App = () => {
  const { on, togglerProps } = useToggle();

  return (
    <Toggle>
      <ToggleOn />
      <ToggleOff />
      <button {...togglerProps} onClick={triggerAnalytics}>
        {on ? 'on' : 'off'}
      </button>
    </Toggle>
  );
};
```

The above code _overrides_ the `onClick` that provides the toggle functionality, so the toggle stops working. We need a way of _combining_ the built-in `onClick` functionality with the custom `onClick` analytics functionality. This is where prop getters comes in:

```js
// Simple helper function for calling multiple functions at once
const callAll = (...fns) => (...args) =>
  fns.forEach(fn => typeof fn === 'function' && fn(...args));

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);

  // This is the prop getter
  const getTogglerProps = ({ onClick, ...props } = {}) => ({
    'aria-pressed': on,
    onClick: callAll(toggle, onClick),
    ...props,
  });

  return { on, toggle, getTogglerProps };
}

const App = () => {
  const { on, getTogglerProps } = useToggle();

  return (
    <Toggle>
      <ToggleOn />
      <ToggleOff />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </Toggle>
  );
};
```

## State Reducers and Inversion of Control

Suppose you have a complex input component like a `Autocomplete` where you need to handle all kinds of interactions. **State reducers** are a way of managing all the state of these kinds of components using the reducer pattern via `useReducer`.

```js
const autocompleteReducer = (state, action) => {
  switch (action.type) {
    case 'change':
    // Handle input change
    case 'reset':
    // Handle clearing input
    case 'submit':
    // Handle pressing enter
  }
};

// This hook uses the state reducer to manage state
const useAutocomplete = () => {
  const [state, dispatch] = useReducer(autocompleteReducer);
  const onChange = value => dispatch({ type: 'change', payload: value });
  const onReset = () => dispatch({ type: 'reset' });
  const onSubmit = payload => dispatch({ type: 'submit', payload });

  return {
    state,
    onChange,
    onReset,
    onSubmit,
  };
};
```

Suppose someone else now consumes your `Autocomplete` component. Sometimes their requirements can get very complex and layered, so how do we build an API that covers all these use cases?

**Answer**: You don't. It's near impossible to account for every possible use case. You can code for the most common use cases, but there are always going to be edge cases.

**Solution**: Instead, you implement **inversion of control**. This just means that you **give the consumer back some control of the internals**, so they can decide for themselves how to implement their unique requirements.

In practice, this means that you can give the user the option to pass their own reducer to `useAutocomplete`, so they can code their own use cases:

```js
const useAutocomplete = (reducer = autocompleteReducer) => {
  const [state, dispatch] = useReducer(reducer);
  // ...

  return {
    state,
    onChange,
    onReset,
    onSubmit,
  };
};

const App = () => {
  const customAutocompleteReducer = (state, action) => {
    // NEW REQUIREMENT: do not allow non-alphanumeric characters
    if (action.type === 'change' && !isAlphanumeric(action.payload)) {
      return state;
    }

    // Fall back to default logic otherwise
    return autocompleteReducer(state, action);
  };

  const { state, onChange } = useAutocomplete(customAutocompleteReducer);

  return <Input onChange={onChange} value={state.value} />;
};
```

There are a few things to note that are clever in this code snippet:

- We default to `autocompleteReducer` if the user doesn't provide a custom reducer to `useAutocomplete` because this helps cover the majority of times where the user doesn't need to make any customizations to our default logic.
- We expose the default `autocompleteReducer` to the user, so they can use it as the fallback in their `customAutocompleteReducer`. The advantage of this is that the user doesn't have to build the reducer from the ground up. They can customize what they want and fall back to default logic for the rest.

## Control Props
