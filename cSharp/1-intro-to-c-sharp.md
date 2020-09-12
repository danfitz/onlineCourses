---
title: 'Intro to C#'
part: 1
date: '2020-08-24'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Intro to C&#35;

## What is the Difference Between C&#35; and .NET?

C# is a **programming language**. .NET is a framework for **building applications on Windows**. .NET uses C#, but there are other languages like F# and VB.NET too.

.NET consists of 2 components: **Common Language Runtime** or **CLR** and a **class library** for building apps.

## What is CLR?

Before C#, we had C and C++. With either of these languages, the compiler translated our code into the native code for the machine running. However, if we were to run that same native code compiled in a different machine/architecture, it wouldn't run.

C# was born from a design choice made in java. Instead of compiling down to machine code and running into the problem of machine specificity, java compiles down to **byte code**.

In C#, our byte code is called **IL code** or intermediate language code. This is code that is _independent_ of the machine it's running on.

**CLR** then translates the IL code into native code for the machine it's running on. This is called a **just-in-time compilation** approach (also called **JIT**): the code is compiled by the machine for the machine right when it needs it. And as long as the machine has CLR installed, C# works.

## The Architecture of .NET Applications

When you build an application in C#, your application consists of building blocks called **classes**.

### Classes

Classes have data called **attributes** and functions called **methods**.

### Namespaces

As the number of classes grows (they can grow the 100s in applications), we use **namespaces** to organize them.

A namespace is a **container** for _related_ classes.

These namespaces could be for:

- Databases
- Graphics and images
- Security
- Etc.

### Assembly

Even higher level, applications also have **assemblies**. An assembly is a container for _related_ namespaces.

Physically, an assembly is a file: either a DLL or EXE. A DLL is a file that includes code that can be reused across different programs. An EXE is a file that can be executed.

## Common Files in C&#35; Application

- `Properties/AssemblyInfo.cs`
  - Identification for the assembly file that gets produced when your C# application gets compiled (title, description, company, etc.)
- `References` directory
  - These are any assemblies that the project references and uses
- `App.config`
  - XML where configuration is set up (example: SQL connection strings)
- `Program.cs`
  - At the top, there are `using X` statements where we import code from other assemblies/namespaces
  - There is also usually a `class Program` with a `Main` function that acts the entry point to the application (when you run your application, `Main` execute)
