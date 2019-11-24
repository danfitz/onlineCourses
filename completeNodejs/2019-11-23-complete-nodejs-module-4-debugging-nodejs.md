---
categories: [backend]
tags: [nodejs, js]
title: "Complete Node.js Developer Course Module 4: Debugging Node.js"
---

## Debugging Node.js

There are 2 kinds of bugs:
* Bugs that throw explicit errors that you can read
* Bugs caused by some problem in the code's logic, which throws no errors

Here are some techniques for debugging:

* `console.log`
  * This is a fundamental way to uncover the values of things, making it clearer where things go wrong.
* `debugger`, `node inspect`, and Chrome dev tools
  1. Add `debugger` at the specific line where you want the code to stop. The point at which you stop gives you access to its execution context.
  2. Run `node inspect <commands>` to spin up a live server.
  3. Access at `chrome://inspect` and click **inspect**. Chrome dev tools will pop open.
  4. Using **Sources**, click **Run**. The code will stop at the `debugger` line. You can see everything going on. You can even use the **Console** to mess around with the available variables.
  5. If you want to run the debugger again, just type `restart` in the terminal.