---
title: 'Logarithm'
part: 4
date: '2022-04-11'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Logarithm

The way to mathematically understand a **logarithm** is by translating it to its exponent form: `log b x = y  iif b^y = x`.

In other words, a logarithm is just asking, "What exponent value `y` applied to base `b` would create `x`?" In even simpler terms, how many times would I be able to divide `x` by `b` before the result is `1`?

**Note**: In computer science, base `b` is always equal to 2. This is known as **binary logarithm** and is defined by the equation `log n = y iff 2^y = n`. (We drop base 2 because it's implied.)

To get the intuition for why logarithmic complexities are so efficient, just think about what it takes to increment the logarithm:

* A logarithm of `0` means the input size must be `1` because `2^0 = 1`
* A logarithm of `1` means the input size must be `2` because `2^1 = 2`
* A logarithm of `2` means the input size must be `4` because `2^2 = 4`
* A logarithm of `10` means the input size must be `1024` because `2^10 = 1024`
* A logarithm of `20` means the input size must be `1048576` because `2^20 = 1048576`

**Every increment to the logarithm requires a *doubling* of the input size**. As a result, as the input size gets huge, this will require a dramatic difference in input sizes to have any effect on the complexity of a logarithmic algorithm.

## A sign of logarithm complexity

You know you're likely dealing with an algorithm with logarithmic complexity when the input size gets sliced in half at every step. An example of this would be *binary search*.
