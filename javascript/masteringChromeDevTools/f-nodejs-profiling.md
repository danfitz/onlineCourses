---
title: 'Node.js Profiling'
part: 6
date: '2021-03-02'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Node.js Profiling

## The `--inspect` Flag

When you run a Node server, you can add an `--inspect` flag to give Chrome the ability to **audit** your Node server.

This gives you access to Connection, Console, Profiler, Sources, and Memory!

**Pro tip**: When you use Profiler in chart view to find really heavy operations, look for the *last child* in the stack of long functions. Every function lower in the stack is only long because of that last child.