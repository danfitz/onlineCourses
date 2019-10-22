---
categories: [frontend]
tags: [react]
title: "React - The Complete Guide Module 1: What is React?"
---

## What is React?

React is a **JavaScript library** for building **user interfaces**.

**JavaScript library** meaning that React happens entirely in the browser!

**User interfaces** meaning that React is all about what is displayed to the user. What is displayed gets broken up into **components**, which are modular parts of a website that can be written on their own and then combined together to make the full website.

By breaking up a website into components, you make your code **maintainable, manageable, and reuseable**!

### First react code

When using React, you need to import two libraries: *React* and *React DOM*. React handles the logic of components themselves. React DOM handles rendering those components into the actual DOM!

**Note**: You will also need the **Babel preprocessor**. This preprocessor allows you to write code in ES6, and it will transpile it down to ES5 for better cross-browser compatibility.

### Why use react?

1. **UI state becomes difficult to manage with just vanilla JS as app gets bigger.** React allows you to focus on the *logic* without worrying about implementation, which keeps your app from exploding with complexity.

2. **React has a huge ecosystem.** That means it's easy to find packages that fix issues.

### SPAs vs. MPAs

**Single-page applications** only require 1 HTML file fetched from the server. The rest is handled by JavaScript/React.

**Multi-page applications** are more route-based and give you back multiple HTML files.

In SPAs, every component is aware of each other and only contain 1 `ReactDOM.render`. In MPAs, each component is often unaware of the other, and there are multiple `ReactDOM.render` calls.

**Pro tip**: SPAs are the standard nowadays and what you will most likely encounter.

### Course outline

1. React basics
  * How to create React components
  * Types of components
  * How components communicate between each other
  * How to output lists
  * Conditional rendering
2. Debugging
  * How to find errors
3. Styling components
  * How to target styles to specific components
4. Components deep dive
  * Lifecycles
  * Component updates
5. HTTP requests
  * How to fetch data and handle data
6. Routing
  * Different URLs
7. Forms & validation
  * How to fetch and validate user input
8. Redux
  * Why use Redux
  * Advanced use cases like async
9. Authentication
10. Testing
  * How to test React applications
  * How to think about testing
11. Deployment
  * How to ship to a server
12. Bonus content
  * Animating React apps
  * Webpack
  * Next steps