---
title: 'Module Methods & Magic Comments'
part: 3
date: '2020-06-30'
categories: [performance]
tags: [js, browser]
source: [frontend masters]
---

# Module Methods & Magic Comments

## Magic Comments

**Magic comments** are a way to add a meaningful bundle name for your lazy loaded bundle. You add it inside the `import` function as an inline comment:

```js
import(
  /* webpackChunkName: "footer" */
  './footer'
);
```

Then in your webpack config file:

```js
{
  output: {
    chunkFilename: '[name].lazy-chunk.js';
  }
}
```

Now at build time, your bundles should include a `footer.lazy-chunk.js` bundle.

### Webpack mode
