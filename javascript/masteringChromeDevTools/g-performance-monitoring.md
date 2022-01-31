---
title: 'Performance Monitoring'
part: 7
date: '2021-03-03'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Performance Monitoring

There are 2 main schools of thought when it comes to performance monitoring:

* **Controlled monitoring**
  * Doing things like using Lighthouse, throttling CPU/internet speeds, etc.
  * At the end of the day though, you're in a controlled space
* **User monitoring**
  * You send code into production, and when your users download it, it measures performance and sends it back to you

## Performance API

A common way to perform user monitoring is through the **Performance API**.

```js
performance.mark('start');

// Do some work...

performance.mark('end');

performance.measure('Our measurement', 'start', 'end');
performance.getEntriesByType('measure');

// POST request to send data to...
```

**Note**: When you use the Performance API, Chrome dev tools adds a "Timings" area in your Performance profiles, allowing you to see your custom user timings.