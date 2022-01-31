---
title: 'Factors and Multiples'
date: '2019-01-31'
categories: [math]
tags: [arithmetic]
source: [udemy]
---

# Factors and Multiples

The topic of this section has to do with the **relationships** between numbers. For example, we know that `12` and `-12` are related in that they're *opposites* of each other.

Similarly, how do numbers like `10` and `15` relate, especially given that `10 = 5 * 2` and `15 = 5 * 3`?

## Divisibility

We say that integer `x` is **divisible** by integer `y` when:
1. `y` divides *evenly* into `x`, or
2. The result of the division is a *whole number*, or
3. We don't get a *remainder* from the division.

Here's some **shorthand tricks** for determining the divisibility of the following numbers:

* *Divisible by 2* if the last digit is 0, 2, 4, 6, 8
* *Divisible by 3* if the sum of the digits is divisible by 3
* *Divisible by 4* if the last two digits are divisible by 4
* *Divisible by 5* if the last digit is 0, 5
* *Divisible by 6* if divisible by 2 and 3
* *Divisible by 7* if 5 × last digit + rest of the number is divisible by 7
  * **Example**: Is `126` divisible by `7`?
    * The last digit is `6`, so `6 * 5 = 30`
    * The rest of the numbers make up `12`, so `12 + 30 = 42`
    * `42` is divisible by `7`!
* *Divisible by 8* if the last three digits are divisible by 8
* *Divisible by 9* if the sum of the digits is divisible by 9
* *Divisible by 10* if the last digit is 0

## Multiples

A **multiple** of `x` is any number that is a product of `x` times a whole number. For example, `2 * 3 = 6`, `2 * 4 = 8`, and `2 * 5 = 10`, so `6`, `8`, and `10` are all multiples of `2`.

Another way of thinking about multiples is that a multiple is *divisible* by its base. `10 / 2` divides evenly into the whole number `5`, so `10` is a multiple of `2`.

## Prime and Composite

You can classify any whole number greater than 1 as either **prime** or **composite**. A **prime number** is only divisible by either `1` or itself. A **composite number** is divisible also by a whole number *other than* `1` or itself.

`7` is a prime number.
`21` is a composite number because it is divisible by `7` and `3`.

**Note**: Another way of thinking about prime and composite is to ask if any whole number between `1` and the number in question divide evenly into the number. For example, it's a given that `1` and `5` divide evenly into `5`. But what about `2`, `3`, and `4`? Because those numbers don't divide evenly into `5`, `5` is a prime number.

## Prime Factorization and Product of Primes

In order to understand prime factorization and product of primes, we need to understand **factors** and **factorization** first.

**Factors** are basically the individual numbers in a multiplication expression. For example, `2 * 3` has factors `2` and `3`. (It's like how we call the parts of an addition expression addends.)

**Factorization** of a whole number is the process of coming up with the whole numbers that multiply together to give us that original number. For example, we know that the factors of `12` are `1`, `2`, `3`, `4`, and `6`.

### Definitions

A **product of primes** is basically a product where every factor is a prime number. For example, a product of primes for `12` would be `2 * 2 * 3`.

In the same vein, **prime factorization** is the process of taking a composite number and finding a product of primes for that number.

## How to prime factorize

The process of breaking down a number into a product of primes, i.e., prime factorize, is to factorize your factors until they're *all* prime.

```
144 = 12 * 12
144 = (3 * 4) * (3 * 4)
144 = (3 * 2 * 2) * (3 * 2 * 2)
144 = 2^4 * 3^2
```

In the example above, `144` factorizes into `12 * 12`. However, `12` is not prime, so it also factorizes into `3 * 4`. Once again though, `4` is not prime, so it factorizes into `2 * 2`.

**Note**: There are a few conventions when your prime factorize that you want to keep in mind:
* Order the numbers from smallest to largest
* All same numbers can be compressed into exponents

## Least Common Multiple

A **common multiple** of two or more positive whole numbers is a number that's divisible by *both* numbers. For example, `24` is a common multiple of `4` and `6` because they both divide evenly into `24`.

A **least common multiple** (LCM) is the *smallest* multiple that two or more numbers divide evenly into. In the example above, the least common multiple of `4` and `6` would be `12`.

### Naive approach to finding LCM

A simple approach to finding the LCM for especially small numbers would be to
1. Take the larger number and create a bunch of multiples
2. Check if the smaller number shares any of its multiples

### Prime factorization approach to finding LCM

For larger numbers, the way to find LCM is this prime factorization approach:
1. Prime factorize the numbers in question
2. Catalog the highest occurrence of each prime factor that appears
3. Form a new product of primes using those highest occurrences and then evaluate

For example, here's this approach applied to `20` and `75`:

1. Prime factorize
   * The product of primes of `20` is `2^2 * 5`
   * The product of primes of `75` is `3 * 5^2`
2. Catalog highest occurrences
   * The highest occurrence of prime factor `2` is `2^2`
   * The highest occurrence of prime factor `3` is `3`
   * The highest occurrence of prime factor `5` is `5^2`
3. Form a new product of primes and evaluate
   * Therefore, the LCM of `20` and `75` is `2^2 * 3 * 5^2 = 300`

**Pro tip**: You can double check your work by checking if the quotients of `300 / 20` and `300 / 75` share common factors other than `1`. `300 / 20 = 15` and `300 / 75 = 4`, and `15` and `4` share no common factors other than 1, so `300` really is the LCM of `20` and `75`.
   * *(This seems to work because the LCM should be low enough to both numbers that dividing both numbers into the LCM shouldn't lead to very large quotients that are further divisible.)*

**Note**: Finding the least common multiple for algebraic expressions (expressions with variables) is the same; you just treat the variables as prime and irreducible.
  * `15(a^2)b` and `10a(b^3)`
  * Reduces to `3 * 5 * a^2 * b` and `2 * 5 * a * b^3`
  * Taking highest occurrences, that means LCM is `2 * 3 * 5 * a^2 * b^3`

## Greatest Common Factor

A **common factor** is a number that divides evenly into two or more positive whole numbers. For example, `2` divides evenly into `16` and `20`, so it's a common factor.

A **greatest common factor** (GCF) is the *largest* number that divides evenly. In the example above, the GCF of `16` and `20` is `4`.

### Prime factorization approach to finding GCF

Just like finding the least common multiple, we do everything the same to find the greatest common factor--except we find the **highest *shared* occurrences**. For example, here's how we find the GCF for `48` and `60`.

1. Prime factorize
   * The product of primes of `20` is `2^4 * 3`
   * The product of primes of `60` is `2^2 * 3 * 5`
2. Catalog lowest occurrences
   * The shared occurrence of prime factor `2` is `2^2`
   * The lowest occurrence of prime factor `3` is `3`
   * The lowest occurrence of prime factor `5` is none (b/c `20` doesn't have it)
3. Form a new product of primes and evaluate
   * Therefore, the GCF of `48` and `60` is `2^2 * 3 = 12`

**Pro tip**: The same double check for least common multiples works with greatest common factors: since `48 / 12 = 4` and `60 / 12 = 5`, `4` and `5` share no common factors other than 1, so we know `12` really is the GCF of `48` and `60`.
   * *(This seems to work because the GCF should be high enough to both numbers that dividing into them shouldn't lead to very large quotients that are further divisible.)*