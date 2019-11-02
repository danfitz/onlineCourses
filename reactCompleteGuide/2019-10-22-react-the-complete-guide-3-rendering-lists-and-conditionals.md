---
categories: [frontend]
tags: [react]
title: "React - The Complete Guide Module 3: Rendering Lists and Conditionals"
---

## Conditional Rendering

A common way to conditionally render is to use the **ternary expression**.

However, this gets unwieldy quickly, so it's best practice to create the JSX in the `render` method *before* the `return` statement.

```js
render() {
  const peopleJSX = this.state.people.map(person => <p>{person.name}</p>);

  return (
    <section>
      {peopleJSX}
    </section>
  );
};
```

## Lists & Keys

When React re-renders a list, it basically **compares** the DOM that *would* be created if it called the `render` method with the current DOM. If it finds any differences, it will change them accordingly.

**Problem**: React doesn't deep dive into every JSX element in a list to view its contents. That's inefficient. That's why React asks for **keys**: the keys uniquely identify the elements in a list, so React knows which ones changed and will *only* update those elements in the DOM. Without a key, React will re-render the *entire list*, which is also inefficient.

**Note**: Using a list's `index` isn't effective either because the index changes as elements are added or removed from the list. You want a *guaranteed unique* key.