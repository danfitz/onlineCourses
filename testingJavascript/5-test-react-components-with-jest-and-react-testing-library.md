---
title: 'Test React Components with Jest and React Testing Library' part: 5 date: '2020-04-30' categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Test React Components with Jest and React Testing Library

This section shows you the principles and practices to test how you're putting your DOM on the screen. The goal is to
give you the confidence to ship your app with peace of mind. We'll be focusing on React, Jest, and React Testing
Library, but these ideas can apply to any framework.

## Basic React Testing

We can actually test our React components using `ReactDOM.render` directly. This is a solution that doesn't depend on
more testing libraries.

1. Create a `div`.
2. Renders your React component inside the `div`.
3. Use DOM query methods and node properties to test the DOM elements rendered.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import TextInput from './TextInput';

test('renders label and input', () => {
  const labelText = 'Input Text Here';

  // 1.
  const div = document.createElement('div');
  // 2.
  ReactDOM.render(<TextInput label={labelText}/>, div);

  // 3.
  expect(div.querySelector('label').textContent).toBe(labelText);
  expect(div.querySelector('input').type).toBe('text');
});
```

### Adding Jest DOM library

The trouble with our naive solution above using basic Jest and `ReactDOM.render` is that our error messages during
testing are not that semantically useful.

The way to get clearer error messages is to extend the possible Jest assertions by introducing **Jest DOM**. This
library adds custom test matchers specifically used for DOM testing.

```js
// Import custom matcher and extend `expect`
import {toHaveAttribute, toHaveTextContent} from '@testing-library/jest-dom';

expect.extend({toHaveAttribute, toHaveTextContent});

// ...

expect(div.querySelector('label')).toHaveTextContent('Favorite Number');
expect(div.querySelector('input')).toHaveAttribute('type', 'number');
```

Now our test is more useful:

- If the DOM node doesn't exist, you'll receive a meaningful error message telling you.
- If the element doesn't have a `type` attribute or a different `type` attribute than `number`, you'll also hear about
  it.

**Pro tip**: It's irritating to have to manually extend every custom matcher. We can solve this problem by importing the
following:

```js
import '@testing-library/jest-dom/extend-expect';
```

(You can even configure your project to have Jest automatically import the extension before running any test.)

### Adding DOM testing library

In its current form, our test has a few issues:

1. We are searching specifically for `'Favorite Number'` as the label text, making our test tightly coupled to
   implementation details. The user doesn't care about letter case and exact wording.
2. If the label's `for` and input's `id` are different, this will break the application for screen readers, yet the test
   will pass.

To solve this, DOM testing library introduces some neat approaches to testing the DOM:

### Refactor 1: programmatically associating label and input

We will be using `queries.getByLabelText` to enforce a connection between the label and input.

```js
import {queries} from '@testing-library/dom';

// ...
const input = queries.getByLabelText(div, 'Favorite Number');
expect(input).toHaveAttribute('type', 'number');
```

What's happening here is that DOM testing library is searching for a label by text, finding the input associated to it,
and returning that input.

This streamlines 2 things:

- We're automatically testing that `for` and `id` are the same.
- By finding by label text, we're automatically testing that a label with the given text exists.

### Refactor 2: regex

The user doesn't care that our label text is exactly `'Favorite Number'`, so our tests shouldn't either. We can actually
pass regex to solve this problem:

```js
const input = queries.getByLabelText(div, /favorite number/i);
```

Now we capture the essentials of what the user wants without getting as bogged down in the implementation.

## Refactor 3: node-specific queries

It's awkward the passing parent element `div` into every query we use. Instead, we can pass our parent element once and
destructure all the queries we need.

```js
import {getQueriesForElement} from '@testing-library/dom';

const {getByLabelText} = getQueriesForElement(div);
const input = getByLabelText(/favorite number/i);
// ...
```

## React Testing Library

This subsection introduces React testing library and much of its useful functionality.

### Render function

In our example above, our steps to render our component can be _abstracted_ for reuse:

```js
// Original implementation
const div = document.createElement('div');
ReactDOM.render(<Component/>, div);
const queries = getQueriesForElement(div);

// Abstraction
const render = ui => {
  const container = document.createElement('div');
  ReactDOM.render(ui, container);
  const queries = getQueriesForElement(container);

  return {
    container,
    ...queries,
  };
};

// Note: We return `container` as well because it's useful in our tests.
```

This is essentially what `render` from React testing library does. Now in every component test, we can just go:

```js
import {render} from '@testing-library/react';

test('TextInput renders input element', () => {
  const labelText = 'Favorite Number';
  const {getByLabelText} = render(<TextInput label={labelText}/>);
  expect(getByLabelText(labelText)).toBeDefined();
});
```

### Writing tests with debug

When writing your tests with React testing library, you have access to a function called `debug` that prints out the DOM
you're testing. This is useful in the same way `console.log` is useful.

To access, `debug`, simply destructure it:

```js
test('Some test', () => {
  const {debug, getByLabelText} = render(
    <TextInput label='Favorite Number'/>
  );
  debug(); // Prints out container

  const input = getByLabelText(/favorite number/i);
  debug(input); // Prints out just input inside container

  input.value = 'I am new text!';
  debug(); // Prints out input with changes
});
```

### Testing event handlers

React testing library introduces the `fireEvent` function to simulate events and trigger props like `onChange`
or `onClick` in your components.

```js
// This component displays an error if your input is outside `min` and `max`
import NumberInput from './NumberInput';
import {render, fireEvent} from '@testing-library/react';

test('NumberInput displays error if number is too high', () => {
  const {getByLabelText, getByText} = render(
    <NumberInput min={1} max={9} label='My Number'/>
  );

  const input = getByLabelText(/my number/i);
  fireEvent.change(input, {target: {value: 10}});

  expect(getByText(/number is invalid/i)).toBeDefined();
});
```

**Pro tip**: The trouble with using `fireEvent` in isolation is that it doesn't perfectly mirror user behaviour. For
example, when a user types text into an input element, it's not only a change event that fires. There are many events
that fire: focus, key up, key down, change, etc.

The good news is that there is a `user` object that you can use to simulate user behaviour. This `user` object basically
just uses `fireEvent` behind the scenes but fires many different events at once.

```js
import user from '@testing-library/user-event';

test('NumberInput displays error if number is too high', () => {
  // ...

  const input = getByLabelText(/my number/i);
  user.type(input, '10');

  // ...
});
```

### Updating props with rerender

Sometimes you want to test a component after a props update. To do this, we use `rerender`. `rerender` basically
re-renders your component in the exact same container, allowing you to pass in new props in the process.

```js
const {getByLabelText, getByText, rerender, debug} = render(
  <NumberInput min={1} max={9}/>
);

// Displays error
user.type(getByLabelText(/my number/i), '10');
expect(getByText(/number is invalid/i)).toBeDefined();

// Doesn't display error AFTER props update
rerender(<NumberInput min={1} max={10}/>);
user.type(getByLabelText(/my number/i), '10');
expect(getByText(/number is invalid/i)).toBeNull();
```

### Asserting that something is NOT rendered

There's actually a problem with our code above: it will throw an error when you call `getByText(/number is invalid/i)`.
That's because no error message is displayed _after_ our re-render, so our `getByText` will tell us that it didn't find
anything by throwing an error.

The solution is to use `queryByText`. Any `query` method doesn't throw an error when it doesn't find anything. Instead,
it returns `null`.

```js
const {getByLabelText, queryByText} = render(
  <NumberInput min={1} max={10}/>
);
user.type(getByLabelText(/my number/i), '10');

expect(queryByText(/number is invalid/i)).toBeNull();
```

**Pro tip**: Generally, we want to use `get` methods because they throw useful error messages. If, however, we need to
test that something is _not_ rendered, then `query` is your best bet.

### Testing accessibility with jest-axe

`jest-axe` extends Jest, allowing us to make assertions about the accessibility of your components. The process to test
accessibility goes like this:

1. Extend Jest with custom `toHaveNoViolations` matcher.
2. Pass container for component into `axe` function to asynchronously return results of axe analysis.
3. Make assertion to test that the results don't have any violations.

```js
// This is a form that's not accessible
const Form = () => (
  <form>
    <input type='text' placeholder='Write something inside me'/>
  </form>
);

// Test file
import {axe, toHaveNoViolations} from 'jest-axe';

// 1. Adds custom matcher
expect.extend(toHaveNoViolations);

test('Form is accessible', async () => {
  const {container} = render(<Form/>);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Now if there _are_ accessibility violations, we will receive informative, descriptive error messages. These error
messages will tell us exactly what isn't accessible, how to fix it, and how to learn more.

**Pro tip**: We can automatically extend Jest to use `jest-axe` matchers using `import 'jest-axe/extend-expect'`.

### Mocking HTTP requests with jest.mock

Suppose we have a component that asks to submit a person's name and returns a custom greeting text queried from an API.

This is how we would test it:

1. Mock the function that queries the API, telling the mock function to return a fake promise with fake data.
2. Render the component and destructure your required queries.
3. Insert a name into input.
4. Click button to submit name.
5. **First**: Test that the mock function was called in the right way (with the correct arguments and the correct number
   of times).
6. Wait for the fake promise to resolve by waiting for the greeting text to display in the DOM.

```js
import {render, wait} from '@testing-library/react';
import user from '@testing-library/user-event';
import GreetingLoader from '../GreetingLoader';
import {loadGreeting as mockLoadGreeting} from '../api';

// 1a. Mock module
jest.mock('../api');

test('greeting loads on click', async () => {
  // 1b. Mock resolved promise value
  mockLoadGreeting.mockResolvedValueOnce({
    data: {greeting: 'THIS IS A TEST GREETING'},
  });

  // 2. Render component and get queries
  const {getByLabelText, getByText} = render(<GreetingLoader/>);

  // 3. Insert name into input
  const input = getByLabelText(/name/i);
  user.type(input, 'Mary');

  // 4. Click submit
  const button = getByText(/submit/i);
  user.click(button);

  // 5. TEST that mock function was called correctly
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary');
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1);

  // 6. TEST that the greeting text from promise EVENTUALLY renders in DOM
  await wait(() => {
    expect(getByLabelText(/greeting/i)).toHaveTextContent(
      'THIS IS A TEST GREETING'
    );
  });
});
```

There's a few things to note in our test:

- `wait` function
    - This is an async function that continually calls its callback _until_ it doesn't throw an error anymore.
    - We usually insert an assertion that _only_ passes after the promise resolves and updates the DOM.
    - **Note**: Behind the scenes, `wait` uses `act`, a function that ensures the render updates inside the component
      have been processed before making your assertions.
    - It also has a _timeout_ value that will throw a final error, implying that the assertion inside will _never_ pass.
- **Pro tip**: We rename the mock function into `mockLoadGreeting` just to make it clear what it's doing.
- `mockResolvedValueOnce` function
    - Takes the argument data and makes it the resolved value of the promise that `mockLoadGreeting` returns
      when `GreetingLoader` invokes it.

### Mocking HTTP requests with dependency injection

Some environments don't support `jest.mock`. For example, Storybook doesn't support it. In this case, here's an
alternative mocking approach called **dependency injection**.

1. In your component, add a prop that accepts the real version of the function as a **default value**.
2. In your test, create a new `jest.fn` and pass it to the component as a prop.

With this coding pattern, the component doesn't need to be passed the function _all_ the time but only in the test.

```js
// component.js
import {getStuff} from './api';

const Component = ({asyncFunction = getStuff}) => {
  // ...
}

// component.test.js
test('test something with the component', () => {
  const mockGetStuff = jest.fn()
  const queries = render(<Component asyncFunction={mockGetStuff}/>)
})
```

### Mocking HTTP requests by intercepting them

Instead of mocking out the functions that make the API call, we can allow our functions to behave normally but then **
intercept** the requests.

To do this, we need the `msw` package:

```js
import 'whatwg-fetch'; // polyfill for fetch on node
import {setupServer} from 'msw/node';
import {rest} from 'msw';

// We're creating a mock REST API with the endpoints we need
const server = setupServer(
  rest.post('/greeting', (req, res, context) => {
    return res(
      context.json({data: {greeting: `Hello ${req.body.subject}`}})
    );
  })
);

beforeAll(() => server.listen({onUnhandledRequest: 'error'}));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
```

**Notes**:

- We include `onUnhandledRequest` so that all requests other than the ones we mocked will error out.
- Like `jest.clearAllMocks`, `server.resetHandlers` clears out any handlers we created in specific tests.

### Mocking animations with jest.mock

Testing a component with an animation _could_ work by using `async/await` and the `wait` function. However, this still
takes time, which is bad for our tests if we want to test the functionality of our tests instantly.

To be able to test our components instantly without waiting for our animations to complete, we can _mock_ out the
animation libraries we use. For example, here's how we mock out `react-transition-group`:

```js
// ToggleMessage.js
import {CSSTransition} from 'react-transition-group';

const ToggleMessage = ({children}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle message</button>
      <div>
        <CSSTransition in={show} timeout={1000} unmountOnExit>
          {children}
        </CSSTransition>
      </div>
    </>
  )
}

// ToggleMessage.test.js
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  };
});

test('Clicking toggle button toggle display of message', () => {
  const message = 'Hello World';
  const {getByText, queryByText} = render(<ToggleMessage>{message}</ToggleMessage>);

  const button = getByText(/toggle message/i)

  expect(queryByText(message)).not.toBeInTheDocument();
  userEvent.click(button)
  expect(queryByText(message)).toBeInTheDocument();
  userEvent.click(button)
  expect(queryByText(message)).not.toBeInTheDocument();
});
```

Here's what's happening in the code above:

- `CSSTransition` causes an element to fade in and out, each time taking 1 second to complete the animation.
- To shorten this process, we mock out `CSSTransition`, turning it into a functional component that does the same thing
  but _instantly_.
    - If the `in` is `true`, display the message.
    - If `in` is `false`, don't display it.

**Pro tip**: Be cautious when you mock your functions. They should capture the essence of what the real function is
trying to do.

### Testing error boundary component

There are a few things we usually want to test in any error boundary component:

1. Test that the error is reported to some logging service
2. Hide any unnecessary `console.error` messages
3. Test that you can successfully recover from error

To test if an error is reported, we mock the report function:

```js
import {reportError as mockReportError} from '../api';

jest.mock('../api');
afterEach(jest.clearAllMocks);

test('calls reportError when there is a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true});
  render(
    <ErrorBoundary>
      <ThrowsError/>
    </ErrorBoundary>
  );

  const error = expect.any(Error); // asymmetric matcher
  expect(mockReportError).toHaveBeenCalledWith(error);
  expect(mockReportError).toHaveBeenCalledTimes(1);
});
```

We don't want our tests to get cluttered up with `console.error` messages, which are generated automatically when an
error is thrown. To fix this, we can mock `console.error`:

```js
// Before all tests, mock into an empty function
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
  });
});
// After all tests, restore console.error
afterAll(() => {
  console.error.mockRestore();
});

// The trouble with mocking console.error is it will hide all USEFUL console.error messages
// We can ensure no useful ones are called by testing number of calls:
test('...', () => {
  // ...
  expect(console.error).toHaveBeenCalledTimes(2);
});
```

To test that we can recover from an error, we will test that the content from the error boundary displays and can be
interacted with. For example, maybe we have a "Try Again" button that re-renders the component:

```js
test('try again button appears and can be clicked to render content again', () => {
  const {getByText, queryByText} = render(
    <ErrorBoundary hasError>
      <button>hello</button>
    </ErrorBoundary>
  );

  expect(getByText(/try again/i)).toBeInTheDocument();
  expect(queryByText(/hello/i)).not.toBeInTheDocument();

  fireEvent.click(getByText(/try again/i));

  expect(queryByText(/try again/i)).not.toBeInTheDocument();
  expect(getByText(/hello/i)).toBeInTheDocument();
});
```

### Simplifying rerender with wrapper option

The `render` function has a helpful options object that you can pass where you provide a `wrapper` to simplify
your `rerender` calls.

So instead of this:

```js
const {rerender} = render(
  <Parent>
    <Child/>
  </Parent>
);
rerender(
  <Parent>
    <Child/>
  </Parent>
);
```

We can do this:

```js
const {rerender} = render(<Child/>, {wrapper: Parent});
rerender(<Child/>);
```

### Mocking components

In our example, we can test that the `Redirect` component from react-router renders correctly. This component is used to
redirect to another page upon render.

```js
const Component = () => {
  const [redirect, setRedirect] = useState(false);
  // Faking an async action like an API call
  useEffect(() => {
    setTimeout(() => setRedirect(true), 1000);
  }, []);

  if (redirect) {
    return <Redirect to='/'/>;
  } else {
    return null;
  }
};

// In test file
import {wait} from '@testing-library/react';
import {Redirect as MockRedirect} from 'react-router';

jest.mock('react-router', () => ({
  Redirect: jest.fn(() => null),
}));

test('redirects asynchronously', async () => {
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}));
});
```

**Note**: We expect a 2nd argument to be passed because that's React automatically passing a context.

### Testing dates in React

Sometimes we want to store a date like when we are writing data to a database. On the frontend, we would simply create
a `new Date()`. However, this becomes an issue in testing, as our mock payload will have its own `new Date()`, which may
be off by milliseconds. So this would fail:

```js
test('...', () => {
  render(<DatedComponent/>);
  expect(mockApiCall).toHaveBeenCalledWith({date: new Date().getTime()});
});
```

To solve this, we can test for a time range instead:

```js
const preDate = new Date().getTime();
test('...', () => {
  render(<DatedComponent/>);

  const postDate = new Date().getTime();
  const date = mockApiCall.mock.calls[0][0].date;
  expect(date).toBeGreaterThanOrEqual(preDate);
  expect(date).toBeLessThanOrEqual(postDate);
});
```

### Custom render function to share between tests

Sometimes our tests share the same initial code. In these cases, it's reasonable to create a custom render function for
that repeated code.

Things you can do in a custom render function include:

- Set up the mock data you need,
- Render the component itself,
- Perform the initial interaction with the component that you need,
- Get elements in the component using `getBy` or `queryBy` or `findBy`, and
- Return any of the above for use in your tests.

Example:

```js
// This custom render function is for a form
const renderEditor = () => {
  const fakeUser = userBuilder();
  const utils = render(<Editor user={fakeUser}/>);
  const fakePost = userBuilder();

  utils.getByLabelText(/title/i).value = fakePost.title;
  utils.getByLabelText(/content/i).value = fakePost.content;
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ');
  const submitButton = utils.getByText(/submit/i);

  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost,
  };
};
```

### Test components that use react-router `Router` provider and `createMemoryHistory`

Some components you test will have react-router components:

```js
const Main = () => (
  <div>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      <Route component={FourOhFour}/>
    </Switch>
  </div>
);
```

If you test the `Main` component on its own, it will error out because it must be wrapped in a `Router` provider. To
test with this provider, you just need to wrap your component in the provider inside your `render` function.

```js
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

test('main initially renders home', () => {
  const history = createMemoryHistory({initialEntries: ['/']});
  render(
    <Provider history={history}>
      <Main/>
    </Provider>
  );
});
```

**Pro tip**: You use `Router` and `createMemoryHistory` when you want to customize the user's history. When you don't
need to customize, it's recommended to just use `BrowserRouter` from react-router-dom.

### Test 404 route by passing a bad entry in `history` object

In our routes, we had a `FourOhFour` route that acts as a fallback if no matching path is found.

```js
<Route component={FourOhFour}/>
```

To test this, we can just pass a bad entry into `createMemoryHistory`:

```js
const history = createMemoryHistory({
  initialEntries: ['/this-path-does-not-exist'],
});
```

Now the `FourOhFour` component should render.

### Custom render function for testing react-router components

Our custom `render` function will have the following features:

1. Ability to include custom initial route,
2. Ability to pass custom `history` object,
3. Ability to pass render options into React Testing Library's native `render` function, and
4. Ability to use `rerender` and still automatically wrap the component in the `Router` provider.

```js
const render = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({children}) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}),
    history,
  };
};
```

### Testing a redux-connected component

Suppose you have a component that is connected to Redux:

```js
const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  const increment = () => dispatch({type: 'INCREMENT'});
  const decement = () => dispatch({type: 'DECREMENT'});

  return (
    <div>
      <span aria-label='count'>{count}</span>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
};
```

All you need to do to test this component is wrap it in a `Provider` with `store` passed as a prop.

```js
test('renders with redux', () => {
  const {getByText, getByLabelText} = render(
    <Provider store={store}>
      <Count/>
    </Provider>
  );

  const increment = getByText('+');
  fireEvent.click(increment);
  expect(getByLabelText(/count/)).toHaveTextContent('1');
});
```

The magic of this approach is that

1. You're testing the component _and_ redux at the same time, since they're integrated together, and
2. You're testing the component as if redux doesn't exist (it's just an implementation detail), so if you ever stop
   using redux, it's not too hard to refactor it out of your tests.

### Testing a redux-connected component with initialized state

The key to passing initial state is to run your `createStore` in your tests:

```js
test('can render with redux with custom initial state', () => {
  const initialState = {count: 3};
  const store = createStore(reducer, initialState);

  const {getByText, getByLabelText} = render(
    <Provider store={store}>
      <Count/>
    </Provider>
  );

  const increment = getByText('+');
  fireEvent.click(increment);
  expect(getByLabelText(/count/)).toHaveTextContent('4');
});
```

### Custom render function for redux-connected components

If you're testing redux-connected components, you are going to be wrapping your component in a `Provider` and passing
a `store` with a custom initialized state _a lot_. We can simplify this with a **custom render function**.

```js
import {render as rtlRender} from '@testing-library/react';

const render = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...rtlOptions
  } = {}
) => {
  const Wrapper = ({children}) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  };
};
```

There's a few things to unpack in this custom `render` function:

- We destructure out `initialState` and `store`, so we can pass the options specific to React Testing Library
  into `rtlRender`.
- We pass a default initialization for `store`, so a user can pass their own custom store if they want.
- We create a `Wrapper` function component that does the `Provider` wrapping for us and then pass it in options
  for `rtlRender`. That way if we use the `rerender` util, the `Provider` will always wrap around the component in the
  future. (We don't have to do it ourselves.)
- We return the `store` itself in case we want some fine-tuned control of redux.

### Test custom React hook

If you use a React hook in isolation, you'll get an error stating that it must be called inside a function component. To
circumvent this, we just call the hook inside a function component!

```js
test('exposes the count and increment/decrement functions', () => {
  // We set an outer variable to store the hook's return value
  let result = {};

  const TestComponent = () => {
    result = useCounter();
    return null;
  };

  render(<TestComponent/>);
});
```

Our `result` has a `count` state and `increment` and `decrement` state updaters. The trouble now though is that we can't
just invoke a state updater. We always have to wrap it in a callback in `act`.

```js
test('exposes the count and increment/decrement functions', () => {
  let result = {};

  const TestComponent = () => {
    result = useCounter();
    return null;
  };

  render(<TestComponent/>);

  expect(result.count).toBe(0);
  act(result.increment);
  expect(result.count).toBe(1);
});
```

### Setup function to test custom React hooks

If our custom React hook accepts arguments to customize its behaviour, we may want to create a custom `setup` function
that handles all the setup required to test each scenario.

```js
const setup = (initialProps = {}) => {
  const result = {};

  const TestComponent = props => {
    result.current = useCounter(props);
    return null;
  };
  render(<TestComponent {...initialProps} />);

  return result;
};

test('allows customization of step', () => {
  const result = setup({step: 2});
  expect(result.current.count).toBe(0);
  act(result.current.increment);
  expect(result.current.count).toBe(2);
});
```

**Note**: Notice how we store the return value of `useCounter` in `result.current`? That's because if we store it
directly in `result` and then return `result`, we only get back the initial state of `useCounter`. On every _re-render_
, `useCounter` returns something new, so to access that new value every time, we store it inside an object.

### Test custom React hook with `renderHook`

It turns out that React Testing Library already provides you with a helper function for testing hooks: `renderHook`.
Just pass your hook into it, and you have access to the hook's internal state using `result.current`.

```js
import {renderHook, act} from '@testing-library/react';

test('allows customization of step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}});
  expect(result.current.count).toBe(0);
  act(result.current.increment);
  expect(result.current.count).toBe(2);
});
```

### Test updates to React hooks with `rerender`

If you want to change the props passed to your custom hook, you can use the `rerender` util that gets returned
from `renderHook`.

```js
test('the step amount can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 2},
  });
  expect(result.current.count).toBe(0);
  act(result.current.increment);
  expect(result.current.count).toBe(2);
  rerender({step: 5}); // This is where the magic happens!
  act(result.current.decrement);
  expect(result.current.count).toBe(-3);
});
```

### Test React portals with `within`

React portals are unique ways to render a component outside of its parent.

Suppose you have this `Modal` wrapper that creates a React portal for its `children`.

```js
const Modal = ({children}) => {
  const el = useRef(document.createElement('div'));
  useLayoutEffect(() => {
    const currentEl = el.current;
    currentEl.setAttribute('id', 'modalRoot');
    document.body.appendChild(currentEl);
    return () => document.body.removeChild(currentEl);
  }, []);
  return ReactDOM.createPortal(children, el.current);
};
```

How do you test for a component that appears outside a parent?

**Answer**: By default, the `render` test function returns test utils that are bound to the entire `document.body`. That
means you don't have to do anything special to test your portaled component!

```js
test('Modal contents render', () => {
  const {getByTestId} = render(
    <Modal>
      <div data-testid='test'/>
    </Modal>
  );
  expect(getByTestId('test')).toBeInTheDocument();
});
```

If however we want to bind our test utils to a custom wrapper element (instead of `document.body`), we can use
the `within` function:

```js
test('Modal contents render', () => {
  const {getByTestId} = within(document.geElementById('modalRoot'));
  expect(getByTestId('test')).toBeInTheDocument();
});
```

Or we can just pass the `modalRoot` as the `baseElement` inside `render`!

```js
const {getByTestId} = render(
  <Modal>
    <div data-testid='test'/>
  </Modal>,
  {baseElement: document.getElementById('modalRoot')}
);
```

### Test unmounting a React component

Suppose you have a component that uses `setInterval` to periodically update state. When this component unmounts then,
you need to `clearInterval` because you can't have the interval continuing to try to update state of an _unmounted_
component. In fact, React will throw an error if you do.

```js
const Counter = () => {
  const [remainingTime, setRemainingTime] = useState(10000);
  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = remainingTime - 100;
      if (newRemainingTime <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(newRemainingTime);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return <div>{remainingTime}</div>;
};
```

To test that cleanup occurs when you unmount, you can use the `unmount` util:

```js
// We mock console.error so as not to muddy our console during tests
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
  });
})
afterAll(console.error.mockRestore);

test('does not attempt to set state after unmount (to prevent memory leaks)', () => {
  // We use fake timers because real timers are too slow during tests
  jest.useFakeTimers();

  const {unmount} = render(<Counter/>);
  unmount();

  act(jest.runOnlyPendingTimers);

  // We test that an error doesn't occur
  expect(console.error).not.toHaveBeenCalled();

  jest.useRealTimers();
})
```

### Writing integration tests

Suppose we have a multi-page form where each step takes you to a new component/page. How do we test this?

With React Testing Library, we can perform an **integration test** where we imitate what a user does:

```js
import {submitForm as mockSubmitForm} from './api';

test('can fill out form across multiple pages', () => {
  mockSubmitForm.mockResolvedValueOnce({success: true});

  const testData = {food: 'test food', drink: 'test drink'};

  const {getByLabelText, getByText} = render(<MultiPageForm/>);

  // Food input
  fireEvent.change(getByLabelText(/food/i), {target: {value: testData.food}});
  fireEvent.click(getByText(/next/i))

  // Drink input
  fireEvent.change(getByLabelText(/drink/i), {target: {value: testData.drink}});
  fireEvent.click(getByText(/review/i));

  // Review
  expect(getByLabelText(/food/i)).toHaveTextContent(testData.food);
  expect(getByLabelText(/drink/i)).toHaveTextContent(testData.drink);

  // Submission
  fireEvent.click(getByText(/confirm/i), {selector: 'button'});
  expect(mockSubmitForm).toHaveBeenCalledWith(testData);
  expect(mockSubmitForm).toHaveBeenCalledTimes(1);
  expect(getByText(/success/i)).toBeInTheDocument();
})
```

### Improve reliability of integration tests using `find` queries

With integration tests especially, there can be many variables that can break your tests in unexpected ways. For
example, what if there are animations that slow down rendering of certain elements?

To help separate the implementation details from your tests, it's a good idea to use `find` queries, so your tests don't
automatically break if something doesn't immediately go as planned.

```js
expect(await findByText(/success/i)).toBeInTheDocument();
```

### Improve reliability of integration tests using User Event Module

To help even further separate the implementation details from our tests, we can use the `user-event` module inside React
Testing Library.

This module gives us user actions that more closely represent how a user actually behaves. This is a much more accurate
approach to testing than imperatively running `fireEvent` methods.

For example, instead of `fireEvent.click`, we can use `user.click`. Or instead of `fireEvent.change`, we can
use `user.type`.

```js
user.type(await findByLabelText(/food/i), testData.food);
user.click(await findByText(/next/i));
```
