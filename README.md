# Dan's Continued Learning Syllabus

This is a roadmap of everything I'm learning now or interested in learning next.

## NOW

I'm currently learning **React** in more depth (including Redux, React Router, Hooks)! I want to understand the intricacies of React and learn to use it to its full potential.

I'm also currently learning **Node.js**, so I can better understand how to work with the backend for a large-scale application I'm building at work.

Finally, a little every day, I'm learning **algorithms and data structures** out of sheer fascination. I want to write efficient code. To me, that means knowing the best code patterns out there and how to measure what's "best" using big O notation. I truly believe that these computer science-y topics are transferrable across languages and frameworks, so I want to invest in them alongside what's hot and popular.

**Current courses**:
* [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
  * 39% complete as of 2019/11/18
* [The Complete Node.js Developer Course (3rd Edition)](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/)
  * 41% complete as of 2019/12/07
* [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/)
  * 5% complete as of 2019/12/07

## NEXT

* Learn mobile starting with React Native using [Stephen Grider's Udemy course](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)

## On SUMMARY.md

Currently, these notes are hosted using GitBook. When GitBook renders the `.md` files into HTML, it dynamically generates a Table of Contents sidebar containing navigation through all notes. However, it's out of order.

To solve this, I need to provide a `SUMMARY.md` file, which allows me to customize what appears in the Table of Contents sidebar. However, it's tedious to maintain this file manually. So, I've included `gitbook-summary` as an npm dev dependency.

Any time an `.md` file is added, removed, or moved:

1. `npm install` all dependencies (if you haven't already).
2. In the root directory, `npm run summarize`. This will generate a `SUMMARY.md` file by going through every file in the repo.
