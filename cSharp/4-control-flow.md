---
title: 'Control Flow'
part: 1
date: '2020-09-23'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Control Flow

## Conditional Statements

### If / else

```cs
if (condition)
  // Statement
else if (anotherCondition)
{
  // Another statement
}
else
{
  // Yet another statement
}
```

### Switch / case

```cs
switch(variable)
{
  case "A":
  case "B":
    // Do something
    break;
  case "C":
    // Do something
    break;
  default:
    // Do something
    break;
}
```

### Conditional operator

```cs
bool isGoldCustomer = true;
float price = (isGoldCustomer) ? 19.95f : 29.95f;
```

## Iteration Statements

### For loops

```cs
for (var i = 0; i < 10; i++)
{
  // Do something 10 times
}
```

### Foreach loops

Iterates over elements of a numerical object. In other words, it has a list nature--like arrays or strings.

```cs
foreach (var number in numbers)
{
  // Do stuff
}
```

### While loops

```cs
while (true)
{
  // Do something infinitely
}
```

### Do-while loops

The only difference with a **do-while loop** is that the code block is executed _at least once_ because the condition is always checked _after_ the code block runs.

```cs
do
{
  // Something
} while (i < 10);
```

### Break and continue

For any of these control flow statements, we have access to the **break** and **continue** keywords. `break` will break out of the loop or flow. `continue` will move onto the next iteration.
