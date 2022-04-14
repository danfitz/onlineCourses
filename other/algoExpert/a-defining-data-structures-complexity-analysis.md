---
title: 'Defining Data Structures and Complexity Analysis'
part: 1
date: '2022-04-08'
categories: [compsci]
tags: [data structures, algorithms]
source: [algoexpert]
---

# Defining Data Structures and Complexity Analysis

## What are Data Structures?

### The point of learning data structures

The fundamental purpose of coding interviews is to evaluate your problem-solving skills.

Data structures are simply the concepts and tools you use to solve problems better.

### Definition of data structures

At its core, all programming is just **manipulating data**: taking data from one place to another and massaging it into a format that you want along the way.

High-level, **data structures** are really just a way to organize and manage that data.

More formally, data structures can be defined by three main components:

* A collection of data values,
* The relationships among them, and
* The functions and operations that can be applied to the data.

## Complexity Analysis

### Definition of complexity analysis

In many cases, when you try to solve a problem, you'll find multiple solutions. How do you determine which is the *best* solution among them?

(This is also a common interview question. Once you solve a problem, you may be asked, "Can you do better?")

**Complexity analysis** is a means of evaluating the quality of a solution, so you can compare it to other solutions. It typically just means figuring out two metrics:

* **Time complexity**
  * How fast a solution runs
* **Space complexity**
  * How much memory a solution uses up

### Connection to data structures

Recall that data structures involve "functions and operations that can be applied to the data". *These* functions and operations have time and space complexity ramifications: they take up time and memory.

Additionally, the relationships among data values in data structures have time and space complexity ramifications too.

So, when in a coding interview, choosing a data structure becomes about

* Finding the data structure that solves the problem
* Finding the data structure that also solves it fastest and with the least memory usage
