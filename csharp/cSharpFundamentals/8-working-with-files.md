---
title: 'Working with Files'
part: 8
date: '2020-10-01'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Working with Files

We will learn about the following useful classes to work with files:

- `File`
- `FileInfo`
- `Directory`
- `DirectoryInfo`
- `Path`

**Note**: All these classes live under the `System.IO` namespace.

## `File` and `FileInfo`

`File` and `FileInfo` give you methods to create, copy, delete, move, and open files.

The only difference is that `FileInfo` provides instance methods, while `File` provides static methods.

**Pro tip**: `File`'s static methods require some security checks to run every time you use them. Whereas `FileInfo` only needs to run security once when you create the instance. So, if you are performing many manipulations, it's more _performant_ to use `FileInfo`.

## `Directory` and `DirectoryInfo`

Just like `File` and `FileInfo` except they allow you to manipulate directories.

## `Path`

Provides methods to work with strings that contain file/directory path information. (It basically is a bunch of string methods that you don't have to create yourself.)

```cs
var path = @"c:\Downloads\somefile.txt";
Path.GetExtension(path);
Path.GetFileName(path);
Path.GetDirectoryName(path);
```
