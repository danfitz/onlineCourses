---
categories: [backend]
tags: [nosql, firebase]
title: "Firestore Queries and Data Modeling Course"
source: [fireship]
---

## Core Concepts

### What is Firestore?

**Firebase realtime database** was the first database management system created by Firebase.

The pain points to it were:
* You couldn't select a **subset** of data in a node; pulling data from a node pulled *all* the data.
* Querying and sorting of data is limited; required lots of client-side code to handle queries and sorting and filtering.

**Cloud Firestore** was created to address these issues. It's a **document-oriented** database (like MongoDB).

### Collections and documents

All data is stored in **documents**. **Collections** are just containers for documents.

**Note**: You can nest **sub-collections** underneath documents. And when you read a parent document, you actually don't pull any data from its sub-collections.

### Firestore is denormalized

Relational databases are **normalized**: they break down data into the smallest parts possible, so there's no *data duplication*.

Mapping of terms between SQL and Firestore:

```
Table => Collection
Row => Document
Primary Key => Document ID
Foreign Key => Document ID references
```

**Note**: There are no `JOIN`s in Firestore. You can "join" data client-side, but this doesn't happen directly with the database. This is by design: `JOIN`s aren't efficient.

### Firestore is schemaless

You can add data to any document on the fly, and it doesn't have to match the data types in other documents in the collection.

The fundamental idea with Firestore is to model your data in a way that **doesn't require a `JOIN`**. You are **prerendering data for read efficiency**.

### Mental Framework for Modeling Data

Aim to model your data based on **how it's going to be consumed by the app**.

Think about the screens/views in your app, then design your data model that's the *path of least resistance* to get that view.

**In contrast**: SQL is designed via preset rules.

**Note**: Given how open-ended Firestore can be, there is usually more than one way to model your data. You have to consider the trade-offs of each.

### Data Types

Firestore has the typical primitive data types: strings, number, booleans, null.

Other data types include:
* Geopoints (latitude and longitude)
* References to other documents
* Map (like an object)
* Array (ordered data)

### Techniques for Data Modeling

1. **Embedding**: adding data directly into a document.
  * This is the first technique you should consider because it's the most cost-effective and performant.
  * You only need 1 document read!
  * **Note**: It's only practical if the data is small because documents are limited to 1MB in size. Plus queries to the document will download the entire document.

2. **Root collection**: creating a collection at root and creating documents in there.
  * This is normalizing your data.
  * Great for maintaining relationships across documents.
  * Great for querying across multiple properties.

3. **Subcollection**: scopes data to individual document.
  * Great for when you need to set up a one-to-many relationship.
  * The only limitation is that queries across parents don't include subcollections (e.g. filtering a collection).
  * **Note**: When you query a document, you have to explicitly request its subcollections!

4. **Bucketing**: a collection of documents that embed relational data.
  * Great for decreasing number of queries to get data.

### Reading Data

**Rule of thumb**: If your query code is simple, you probably have a good data model. If it's complicated, you probably need to rethink the data model.

```js
// Document read
const userPromise = db.collection('users').doc('userId')

// Subcollection read
const subPromise = db.collection('users').doc('userId').collection('tags')

// Bucket read
const userPromise = db.collection('users').doc('userId')
const tagPromise = db.collection('tags').doc('userId')

// ** Multi-document read **
// Given an array of doc IDs, read them all at a given collection
const user = await db.collection('users').doc('userId')
const tagIds = user.data().tags // grabs array of tag IDs

const readIds = async (collection, ids) => {
  const promises = ids.map(id => db.collection(collection).doc(id).get()) // returns array of promises
  const responses = await Promise.all(promises) // returns array of responses
  const data = responses.map(response => response.data()) // returns array of data
  return data
}

const tagData = readIds('tags', tagIds) // MULTI-DOCUMENT READ!
```

**Note**: Under the hood, the Firebase SDK performs **pipelining**, which combines requests and runs them concurrently.

### Massaging Data

Some useful methods for massaging data **server-side** include:
* `where('key', '>=', today)`
  * You'll use this the most!
  * **Note**: Range operators like `>=` can only be used once, while equality operators can be used infinitely.
  * **Note 2**: There is no inequality operator, so you have to combine an **above** and **below** query

```js
// Excludes all users who are age 25
const above = db.collection('users').where('age', '>', 25)
const below = db.collection('users').where('age', '<', 25)
```

* `orderBy('key', 'desc')`
  * **Note**: If some documents don't contain your chosen key, they'll be filtered out.
* `limit(20)`
* `startAfter` and `endBefore` (exclusive) plus `startAt` and `endAt` (inclusive)
  * Great for pagination

**Pro tip**:
* You can chain these methods. These chains work like the **AND** operator.
* However, there is no **OR** operator. To mimic OR, just create multiple queries.

**Best practice**: It's often much easier to perform many small queries and combine them client-side than to try to perform one giant query.

**Bonus**: `where` has a special `array-contains` operator that checks if an array contains a value, returning the array if there's a match.

### Indexes

What are indices? I don't get it...

In any case, Firestore will throw an error if it recommends you create an index.

### Security

The most important thing to keep in mind when it comes to security is that you *cannot partially read a document*. So whatever access you provide, they have access to *all* of the data.

Some models of security:

```
// No read/write access from client-side at all
// ONLY accessible server-side via dashboard
match /accounts/{id} {
  alow read, write: if false;
}

// Read/write access for user only
// Great for private data like email
match /users/{id} {
  allow read, write: if id == request.auth.uid;
}

// Public read access, private write access
// Great for visible data like usernames
match /profiles/{id} {
  allow read;
  allow write: if id == request.auth.uid;
}
```

**Best practice**: If you want a data set to have its own security rules, it's best to place it into its own collection.

## Relational Data Modeling

### Cardinality

Ask yourself: **how many items can be in a set?** A few? Hundreds? Billions?

* If only a few, it makes the most sense to **embed** in the parent document.
* If hundreds, it makes sense to create a **bucket document** with the same document ID.
* If billions, opt for a **collection** because it can scale indefinitely.

### One-to-one

**One-to-one** relationships are the easiest to model. There are 3 ways of creating the relationship:
1. Embed data inside document.
  * If the relationship is truly unique, this should work.
2. Create 2 documents in different collections using the same document ID. (Like buckets.)
  * **Pro tip**: Using the same document ID *enforces* the one-to-one relationship as well. It makes it impossible to accidentally create a duplicate relationship.
3. Create a reference ID pointing to the other document.
  * **Note**: This is less efficient because it requires an extra query: getting the reference ID.

Code implementation:

```js
// 1. Embedded one-to-one
const user = db.collection('users').doc('userId')

// 2. Bucket one-to-one
const user = db.collection('users').doc('userId')
const posts = db.collection('posts').doc('userId')

// 3. Reference one-to-one
// REQUIRES WAITING FOR FIRST PROMISE TO COMPLETE
let posts

db.collection('users').doc('userId').get()
  .then(snapshot => {
    const user = snapshot.data()

    posts = db.collection('posts').doc(user.postId)
  })
```

### One-to-many

**One-to-many** relationships are the most common. There are 3 ways to model it:

1. Embed an array of maps
  * Great when you have a small number of items in a set and don't need to query the data.
  * If you need to query the data, you have to read *all parent documents* and then query client-side, which is expensive.

So, if data needs to be *queried*, opt for:

2. Subcollection
  * However, you can only query scoped to the specific document

So, if you need to query across parent documents, opt for:

3. Root collection
  * Here, you reference the relevant document ID in your documents, creating the relationship.

```js
const authorId = 'ayn-rand'

// 1. Embedded array of maps
const authorWithBooks = db.collection('authors').doc(authorId)

// 2. Subcollection
const books = db.collection('authors').doc(authorId).collection('books')

// 3. Root Collection, requires index
const booksFrom1971 = db.collection('books')
  .where('author', '==', authorId)
  .where('published', '>', 1971)
```

### Many-to-many

**Many-to-many** relationships are the most complex to model.

1. Create an **middle-man collection**
  * In a middle-man collection, the 2 document IDs are keys in the document.
  * The original documents don't have data about the relationship. They have to go to the middle-man collection to get the data.
  * **Note**: If you want to create a unique relationship (e.g. user can only heart a post once), make the document ID into a **composite ID**, which combines the 2 document IDs together.

2. Embedded map with document IDs as keys
  * You're essentially creating a reference point for related data in the document.
  * The downside to this is that when we're querying the data, we're pulling in data from the parent document as well, which could be unnecessarily expensive.

3. Embedded array with document IDs as items
  * This is similar to an embedded map but uses an array instead.
  * **Note**: You can only use the `array-contains` operator once at a time.

```js
const authorId = 'dr-seuss';
const bookId   = 'lorax';

// 1. Middle Man Collection
const userReviews = db.collection('reviews').where('author', '==', authorId);
const bookReviews = db.collection('reviews').where('book', '==', bookId);

// Single read with composite key
const specificReview = db.collection('reviews').doc(`${bookId}_${authorId}`);

// 2. Map
// Reviews embedded on books
const bookWithReviews = db.collection('books').doc(bookId);
const userReviews = db.collection('books').orderBy('reviews.jeff-delaney');

// 3. Array
const books = db.collection('books').where('categories', 'array-contains', 'fiction');

// 4. Bucket
// Get a collection of documents with an array of IDs
const getLikedBooks = async () => {

  // Get books through user likes
  const userLikes = await db.collection('likes').orderBy('jeff-delaney').get();
  const bookIds = userLikes.docs.map(snap => snap.id);

  const bookReads = bookIds.map(id => db.collection('books').doc(id).get() );
  const books = Promise.all(bookReads)
}

getLikedBooks()
```

## Advanced Techniques for Efficiency

### Data duplication

**Data duplication** is about duplicating data at different places in the database to decrease the number of reads required to get the data. (This is a no-no in SQL but normal in NoSQL.)

An example of data duplication is a one-to-many relationship where a user can have multiple comments. Each comment is given the user's document ID for reference. However, if we want to avoid reading the user's document to get more data on them, we can *duplicate* some of that data in the comment document itself.

Data duplication makes the most sense when you have information with **lots of reads but few writes**: you're decreasing number of reads required to gather data, but you're increasing number of places you have to write when that data changes.

**Pro tip**:
* Good candidates for data duplication are things like usernames, which almost never change. When they do change, however, you may have to update them in 1000s of documents.
* Bad candidates are things like

## Aggregation via cloud functions

We can create cloud functions like `onCreate`, `onDelete`, `onUpdate`, and more that run when an event happens.

The most common use case for this is incrementing and decrementing counters (e.g. like count). By creating aggregate data, you decrease the number of reads required to get that data, increasing performance.