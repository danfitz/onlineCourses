---
title: 'Working with Dates'
part: 1
date: '2020-09-28'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Working with Dates

## `DateTime`

In the `System` namespace, we have access to the `DateTime` class.

```cs
var dateTime = new DateTime(2020, 09, 28); // year, month, day
var now = DateTime.Now;
var today = DateTime.Today;

Console.WriteLine("Hour: ", now.Hour);
```

**Note**: `DateTime` objects are immutable. You can, however, increment/decrement time with them using any `AddX` methods that return a _new_ `DateTime` object:

```cs
var tomorrow = now.AddDays(1);
var yesterday = now.AddDays(-1);
```

You can also convert `DateTime` objects to strings:

```cs
now.ToLongDateString();
now.ToShortDateString();
now.ToLongTimeString();
now.ToShortTimeString();
now.ToString("yyyy-MM-dd HH:mm"); // date and time WITH format specifier
```

## `TimeSpan`

`TimeSpan` is where you can represent a **length of time**.

```cs
var timeSpan = new TimeSpan(1, 0, 0); // hours, minutes, seconds
var timeSpan2 = TimeSpan.FromHours(1); // more semantic version

timeSpan.Minutes; // returns 0
timeSpan.TotalMinutes; // returns 60
```

Once again, `TimeSpan` is immutable, but it has useful methods for updating that return a _new_ `TimeSpan` object:

```cs
var newTimeSpan = timeSpan.Add(TimeSpan.FromMinutes(8));
var anotherTimeSpan = timeSpan.Subtract(TimeSpan.FromMinutes(4));
```

Conversion to and from strings:

```cs
timeSpan.ToString(); // to string
TimeSpan.Parse("01:45:01"); // from string
```
