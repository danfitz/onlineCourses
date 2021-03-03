---
title: 'Image Performance'
part: 8
date: '2021-03-03'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Image Performance

Here are few choices to make your image load faster:

## `srcset`

```html
<img
  srcset="small.jpg 300w,
  medium.jpg 800w,
  large.jpg 1200w"
/>
```

`srcset` is an API available directly in your HTML! Each image loads when the screen size is a certain width *or below*.

**Pro tip**: You want to keep using `src` as a fallback in case `srcset` isn't supported.

**Note**: Interestingly, if you shrink your screen size, the browser won't fetch the lower-quality images. The rationale is that it's wasteful to fetch a lower-quality version if you already have the higher-quality one. (But the browser does fetch higher-quality images as you expand your screen size.)