---
title: 'File I/O and Exceptions'
part: 3
date: '2022-04-20'
categories: []
tags: [java]
source: [coursera]
---

# File I/O and Exceptions

## File I/O

Java I/O works via a **stream**: a connection to a source of data. This connection could be to

* Files
* Keyboard input
* Etc.

To perform I/O at a high-level, these are the steps:

1. `import java.io.*;`
2. Open a stream
3. Use the stream (read, write, or read-write)
4. Close the stream

### Reading with `FileReader` and `BufferedReader`

```java
// 1. Import
import java.io.*;

// 2. Open stream
File myFile = new File(pathToFile);
FileReader fileReader = new FileReader(myFile);
BufferedReader bufferedReader = new BufferedReader(fileReader); // buffered version

// 3. Use stream
String s = bufferedReader.readLine(); // returns null if nothing more to read

// 4. Close stream
fileReader.close();
bufferedReader.close();
```

### Reading with `Scanner`

```java
// 1. Import
import java.io.*;

// 2. Open stream
File myFile = new File(pathToFile);
Scanner scanner = new Scanner(myFile);

// 3. Use stream
scanner.next(); // next string
scanner.nextBoolean(); // next boolean
scanner.nextInt(); // next int
scanner.hasNext(); // check if there's a next string!
scanner.hasNextBoolean(); // check if there's a next boolean!
scanner.hasNextInt(); // check if there's a next int!

// Best practice is to check before getting next
if (scanner.hasNextInt()) {
  int i = scanner.nextInt();
}

// 4. Close stream
scanner.close();
```

### Writing with `FileWriter` and `PrintWriter`

```java
// 1. Import
import java.io.*;

// 2. Open stream
File myFile = File(pathToFile);
boolean append = true; // decides if writing to file appends to end or not
FileWriter fw = new FileWriter(myFile, append);
PrintWriter pw = new PrintWriter(fw);

// 3. Use stream
pw.println("Dear diary,"); // on new line
pw.print("Uh oh"); // on same line

// IMPORTANT: Force data to be written to file
pw.flush();

// 4. Close stream
fw.close();
pw.close();
```

### Writing with `FileWriter` and `BufferedWriter`

```java
// 1. Import
import java.io.*;

// 2. Open stream
File myFile = File(pathToFile);
boolean append = true; // decides if writing to file appends to end or not
FileWriter fw = new FileWriter(myFile, append);
BufferedWriter bw = new BufferedWriter(fw); // uses buffering for efficiency

// 3. Use stream
bw.write("Dear diary,");
bw.write("\n");
bw.write("Uh oh");

// IMPORTANT: Force data to be written to file
bw.flush();

// 4. Close stream
fw.close();
bw.close();
```

## Exceptions

**Errors** are actual bugs in your program:

* Going out of bounds of array
* Trying to use a `null` reference

**Exceptions**, on the other hand, have to do with causes outside of your program:

* Trying to read a file that doesn't exist
* Running out of memory

Because exceptions aren't necessarily *your* fault, often times the best thing you can do is write your code in such a way that **catches** and **handles** those exceptions.

### Try, catch, finally pattern

Java has a control flow for catching and handling exceptions:

```java
try {
  // Do your normal code
} catch (Exception1 e1) {
  // Handle one kind of exception 
} catch {Exception2 e2) {
  // Handle another kind of exception
} finally {
  // This runs at the end no matter what
  // (whether code runs successfully or exception occurs)
}
```

**Note**: The `finally` block even runs when you provide a `return` statement in the other blocks!

### Passing the buck

Sometimes you don't want to be handling the exception yourself because you want the caller of the method to handle the exception themselves.

What you can do when defining a method that can generate an exception is to include a `throws` keyword:

```java
void openFile(File file) throws IOException {
  FileReader fileReader = new FileReader(file);
  // ...
}
```