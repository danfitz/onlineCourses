---
title: 'Memory'
part: 10
date: '2021-03-04'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Memory

## Causes of Memory Leaks

### What are memory leaks?

In JavaScript, memory is automatically allocated, referenced, and released for you.

A **memory leak** occurs when the memory *can't* be released.

* Wave
  * Memory starts at 0, gets allocated, and then released back down to 0
* Upward ramp that flattens out
  * Memory starts at 0, gets allocated, and you continue to use it throughout the life of your application
* Jigsaw
  * Memory keeps growing and growing and growing and never goes down
  
### Common causes

Accidental global variables:

```js
// When this function finishes running, it can't garbage collect
// because `bar` is in the global scope
function foo() {
    bar = "This variable gets assigned all the way in the global scope";
}
```

Forgotten timers:

```js
// You need to cancel this timer at some point!
setInterval(() => console.log('I will never stop running!'), 1000);
```

Storing a DOM node in a variable and then removing it:

```js
// Even though you remove the button from the DOM,
// the `button` variable continues to store it
const button = document.getElementById('button');
function removeButton() {
    document.body.removeChild(document.getElementById('button'));
}
```

## Chrome Task Manager & Snapshots

### Chrome Task Manager

A quick at-a-glance way to check for memory leaks is to open **Chrome Task Manager** under "More Tools" (not part of dev tools).

By adding the *JavaScript memory* column, you'll know there's a memory leak if the memory allocated for your site goes up and up.

### Snapshots

The Performance tab helps you *spot* a memory leak. The Memory tab helps you figure out *what's causing* the memory leak.

WIP...