---
title: 'Intro'
part: 1
date: '2020-06-29'
categories: [performance]
tags: [js, browser]
source: [frontend masters]
---

# Intro

The top 3 webpage load time causes are:

* Amount of JS for initial download
* Amount of CSS for initial download
* Amount of network requests on initial download

Here are the goals we want to achieve in regards to these load time causes:

* <= 200kb (uncompressed) of initial JS
* <=100kb (uncompressed) of initial CSS
* HTTP: <= 6 initial network calls
* HTTP/2: <= 20 initial network calls
* **90%** code coverage

## Code Coverage

In Chrome DevTools, you can see how much **used and unused code** there is in your application. That’s **code coverage**.

If you can reduce the amount of unused code, performance can skyrocket by seconds. This is **instant low-hanging fruit** to improve your performance.

**Pro tip**: You can bake performance into your CI pipeline by setting a standard that breaks your build *if* the app goes over a certain code coverage amount. This sets performance as a **first-class citizen**.
 
## Code Splitting

**Code spitting** is the process of splitting pieces of your code into async chunks at build time. It’s a way to reduce the amount of unused code in your application.