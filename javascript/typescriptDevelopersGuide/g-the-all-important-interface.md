---
title: 'The All-important Interface'
part: 7
date: '2021-03-28'
categories: [frontend]
tags: [react, js, ts]
source: [udemy]
---

# The All-important Interface

**Interfaces** allow you to define a _new type_ that describes the property names and their types for an object.

## Syntax for Interfaces

A very common use case for interfaces is when you write out very long type annotations for objects:

```ts
const printVehicle = (vehicle: {
  name: string;
  year: number;
  broken: boolean;
}): void => {
  console.log(`Name: ${vehicle.name}`);
  console.log(`Year: ${vehicle.year}`);
  console.log(`Broken? ${vehicle.broken}`);
};
```

The type annotation is _long_. What happens if we need to create more functions? We'll have to repeat our annotation. Additionally, what if we add more properties? That's even more maintenance.

To solve this, we declare an interface:

```ts
interface Vehicle {
  name: string;
  year: number;
  broken: boolean;
}

const printVehicle = (vehicle: Vehicle): void => {
  // ...
};
```

**Note**: Behind the scenes, an interface works because TypeScript loops through the object's properties and methods and checks that it **satisifes** the interface's shape. (This includes non-primitive data types _and_ functions too.)

## Refactor: Sufficiency of Interfaces

Suppose that our `printVehicle` function only uses 1 property from the `vehicle` parameter.

```ts
const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.name);
};
```

Do we _really_ need every other property/method in our `Vehicle` interface? No! We only care about the properties/methods that are **sufficient** for our use case.

```ts
// Note: we rename the interface b/c with so few properties,
// it's not really a vehicle anymore
interface Identifiable {
  name: string;
}

const printVehicle = (vehicle: Identifiable): void => {
  console.log(vehicle.name);
};
```

Now we've created a more generic interface that can be reused in more places!

## Code Reuse with Interfaces

We can now reuse `Identifiable` with other very different objects. As long as the object has the `name` property as a string, it is considered an `Identifiable` type.

```ts
const drink = {
  name: 'Pepsi',
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

// We rename the function to be more generic
const printName = (item: Identifiable): void => {
  console.log(item.name);
  j;
};
```

**Pro tip**: Interfaces are the encouraged pattern to promote code reuse in your applications. As much as possible, use an interface to **gatekeep** your functions, and then create objects/classes that _implement_ those interfaces to pass them into your functions.

## General Plan with Interfaces
