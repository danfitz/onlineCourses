---
title: 'Building A Custom Express API'
part: 9
date: '2021-01-26'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Building A Custom Express API

## Sign-up Flow

These are basic requirements to create a sign-up flow in an any backend API:

1. Connect to a database instance.
2. Set up a `User` model.
3. Set up a `POST` route.
4. In this `POST` route, when the user sends an `email` and `password` in the `req.body`, pass it into the `User` model and attempt to save it to the database.
5. If any errors occur, communicate the errors back to the user.
6. If no errors occur, use the user's email or id plus a secret key to create and send back a **JSON web token** for future validation.
7. For all future authenticated routes, require the JSON web token in the payload. When you receive the token, unpack it to receive the user's `email`, so you know what user account is making the request.
8. If the JSON web token fails verification (using the secret key), send back an error message. Otherwise, fulfill the request.

**Note**: A JSON web token is information encoded using a _secret key_. This encoded information is very easy to read and will often store a user's identification (like an email or username). However, it's _very_ difficult to change this token without invalidating the identification. Think of it like a **driver's license** or **dollar bill**: it has techniques for making it easy to tell when the item is fake or not.

## Sign-in Flow

1. When the user first signs up, pass the password with a **randomly generated salt** appended through a **hashing algorithm**.
2. Store the hashed password and the salt in the database.
3. When the user signs in, use the plaintext password that the user sent you plus the salt in the database to re-generate the hashed password.
4. If the generated hashed password is the same as the one stored in the database, then the user is real.
5. Send them back a JSON web token.

**Note about hashing**:

- Hashing algorithms are powerful because they are **one-directional**. When you give a certain input, it always spits out the same output.
- This is useful for passwords because you can validate that the user provided the correct password _without them actually telling you their password_.

**Note about salting**:

- Salting is a response to **rainbow table attacks**. A malicious user with access to your hashed passwords and who knows which hashing algorithm you used can generate a reference table of common passwords with their hashes. Using cross-reference, they can then find hashes that match the reference table, giving them the password!
- When you salt, you essentially _muddy_ the information. The user can't create rainbow tables as easily. They now have to account for all the salts.
- **The goal**: The purpose of a salt is to make it **computationally infeasible** to use techniques like rainbow tables: to cut out the easy, quick options.

## Authenticated Endpoints Flow

1. In the request, user sends a JSON web token plus whatever payload is required.
2. Server uses a middleware that runs _before_ the endpoint to validate that the JSON web token is real.
   - Since the JSON web token has a unique identifier in it, you can use that to find the user in the database and store it in `req.user` for the endpoint to use.
3. Process the request using the payload and the `req.user` data.
