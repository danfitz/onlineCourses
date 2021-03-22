---
title: 'Networking'
part: 4
date: '2021-03-01'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Networking

## The Waterfall

## Color Codes

When you hover over a network request in the waterfall column, you'll notice different color codes associated with different states:

* **Queueing** is white
  * There are limits to number of HTTP requests processed at once, so a queue gets created
* **Stalled/blocking** is grey
  * Request hasn't been sent out yet; still waiting
* **Proxy negotiation** is grey
  * Request has been sent to a proxy server, but it hasn't reached the real server yet
* **DNS lookup** is dark green
  * The time it takes to find the IP address associated to the base URL
  * *Note*: The DNS lookup gets cached, so the lookup doesn't have to happen every time you visit the base URL
* **Initial connection/connecting** is orange
  * Time it takes to establish a connection (includes TCP handshakes and negotiating SSL)
* **SSL** is brown
  * Time spent completing a SSL handshake
* **Request sent/sending** is green
  * How long it takes to actually sent the network request
* **Waiting (time to first byte)** is green
  * Captures the time spent waiting for the server to deliver a response (after all request work is done)
  * *Note*: A slow TTFB is a sign of an issue in the application server
* **Content download/downloading** is blue
  * Time spent receiving the response data
  * This is mostly dependent on your connection speeds and device speeds

**Pro tip**: If you see a really long color block, that's probably a sign of a **network configuration issue** somewhere.

## Screenshots

If you use the **capture screenshots** button, dev tools will show you a series of screenshots for each **re-paint** of the DOM as more and more resources come in from the network.