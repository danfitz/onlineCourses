---
title: 'Debugging'
part: 3
date: '2021-02-25'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Debugging

## Step-through Debugging

To start stepping through your code, you need to set a **breakpoint**. There are 2 ways to do this:

* Add the `debugger` keyword anywhere in your executed code. Your browser will read it and halt the execution of your code at that point.
* In the Sources section, add a breakpoint by clicking on the line number of your target file.

## Types of steps

You have the following step options when the browser hits your breakpoint:

* Step over next function call (when you want to skip entering a function)
* Step into next function call (when you want to enter a function)
* Step out of current function call (when you want to leave a function)
* Step (goes to next line of code)

**Note**: The step-through debugger can't time travel (i.e. go backwards), so if you step forward and want to go back, you have to start over.

### Watch

You have the ability to **watch a variable**. When you add a variable to this list, it will give you a real-time view of what is stored in that variable at the exact point you are at.

So if you step forward, it will update real-time. For example, if the variable suddenly goes out of scope, it will become `undefined`.

### Call stack

This tab shows all the functions leading up to the one you're currently inside of. It's useful for tracing back the source of your problem.

**Note**: The call stack does have *time travel*, so clicking at different points in the call stack allows you to start from there.

### Contextual information

When stepping through your files' code, you may notice some **contextual information** appears. Here's some worth knowing about:

* Variable values near you and within scope will appear automatically alongside the code.
* When you hover over an object, it will show all the available methods and properties.
* When you hover over a function, you can see its arity.

## Blackboxing

Once you get into frameworks and libraries, you'll often find yourself investigating how you fell into some error state, but the call stack is full of library internals that don't matter. (We assume those internals aren't the cause of the error.)

**Blackboxing** allows you to hide scripts in the call stack, so step-through debugging doesn't unnecessarily go through those internal scripts.

2 ways of blackboxing:

1. Right-click a script in the call stack and blackbox it
2. In settings, add a blackboxed pattern to globally blackbox scripts

## Conditional & XHR Breakpoints

### Conditional breakpoints

Sometimes you're using a reusable function, but you don't want to stop the application *any time* that function is invoked. Instead, you only want to stop the application when the *conditions that created the bug* are met.

You can therefore set a **conditional breakpoint** in one of 2 ways:

1. In your code editor, place `debugger` in an `if` block
2. In dev tools, right-click the line number you want to stop at and click "Add conditional breakpoint..."

### XHR breakpoints

Similar to *DOM breakpoints*, **XHR breakpoints** are useful when you know the error happens around some API call but don't know where that happens in the code.

To set an XHR breakpoint, you search for an API endpoint URL that contains some string you pass. Then when the API call gets made, the application halts at that line of code.

**Pro tip**: XHR breakpoints just get you to the location of your bug. You then need to use the call stack, watch variables, and step through the code to find the source of the problem.

## Example Process

Suppose you click a button on your website that is supposed to fetch content and display it below the button. However, nothing happens when you click. How do you go about debugging this issue?

1. Start by looking at the Console. All your errors will appear there.
2. Associated to the error, there's a link to the file where the error occurs. Click into that file.