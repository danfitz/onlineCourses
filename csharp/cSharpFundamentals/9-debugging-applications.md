---
title: 'Debugging Applications'
part: 9
date: '2020-10-01'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Debugging Applications

## Breakpoints and Debug Mode

1. Add breakpoints at different lines in your applications.
2. Run your application in **debug mode**.
3. When you execute your code, the debugger will stop at your breakpoints and tell you the current state of your application: values of variables, call stack, etc.

## Debugging Tools

Visual Studio provides the following debugging tools that appear when you are in debug mode:

- **Watch**: You can add variables and watch their current values change over time.
- **Autos**: The same as Watch except the variables in scope are automatically found.
- **Locals**: Just like Autos except it only shows variables specifically in the _local scope_.
- **Call Stack**: Shows how deep you are in the call stack and allows you to jump to different function calls for each level.
