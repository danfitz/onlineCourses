---
title: 'Memory'
part: 2
date: '2022-04-09'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Memory

## Memory slots

When you perform a simple operation like declare a variable, you are asking the computer to store the value in an **available memory slot or series of memory slots**, which each have a zero-indexed **memory address**.

A single memory slot contains **8 bits** or a **byte**, which means **256 possible values** in an available memory slot. When a value requires multiple memory slots, it then takes up a back-to-back series of available memory slots.

**Pro tip**: Now it makes sense why there are 32-bit integers or 64-bit integers. These integers are represented by either 4 or 8 memory slots respectively. These are known as *fixed-width integers*.

**Note**: You may wonder how you can store strings. The solution is to use a mapping of characters to numbers (like ASCII). We'll return to this more later.

> **Important**: The amount of memory slots is **bounded** or **finite**, so that's why we care about space complexity!

## Accessing memory slots

Accessing a memory slot or series of memory slots is considered an **elementary operation**, i.e., treated as a single unit of work. This is because it's trivial for a computer to do it: it is a very fast operation.

An example of such an elementary operation would be accessing a value in a list at an index. This is essentially accessing a memory slot.

## Pointers

A **pointer** is essentially storing a memory address *in* a memory slot (or series of memory slots). That way when you access the memory slot, the computer then knows to go to the other memory slot associated to the memory address.

Pointers come with a few benefits:

* You don't have to have all of your data in a back-to-back series since you can now point to anywhere you want
