---
title: 'Introduction'
part: 1
date: '2021-02-23'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Introduction

What you'll learn:

- Using DevTools as an IDE
- Debugging complex applications
- Analyzing network traffic
- Auditing a website
- Monitoring real user performance
- Profiling CPU usage
- Analyzing Node.js performance
- Finding and fixing memory leaks
- Tips and tricks!

## The Panels in Dev Tools

- **Elements** shows a visual representation of the DOM and the styles applied to its nodes
- **Console** is an interactive REPL
- **Sources** is like your text editor containing all the files in your filesystem
  - Also includes a **debugger** with call stack, breakpoints for step-through debugging, etc.
- **Network** shows the waterfall: every HTTP request your website makes
- **Performance** profiles everything your CPU is doing: JS that gets parsed, where repaints happen, where bottlenecks may be, etc.
- **Memory** profiles the memory allocation of your site during a given snapshot
  - Good for checking for _memory leaks_
- **Application** shows browser storage (cookies, local storage, session storage, etc.) and other state
- **Security** is for checking for HTTPS
- **Lighthouse** runs your site through a suite of tests (a good starting place)
