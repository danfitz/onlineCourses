# Dan's Continued Learning Syllabus

This is a roadmap of everything I'm learning now or interested in learning next.

## Current Courses

* [The Complete React Native + Hooks Course](https://www.udemy.com/course/the-complete-react-native-and-redux-course/)
* [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/)
  * 60% complete as of 2021/01/17
* [Ultimate AWS Certified Solutions Architect Associate 2021](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c02/)

## On SUMMARY.md

Currently, these notes are hosted using GitBook. When GitBook renders the `.md` files into HTML, it dynamically generates a Table of Contents sidebar containing navigation through all notes. However, it's out of order.

To solve this, I need to provide a `SUMMARY.md` file, which allows me to customize what appears in the Table of Contents sidebar. However, it's tedious to maintain this file manually. So, I've included `gitbook-summary` as an npm dev dependency.

Any time an `.md` file is added, removed, or moved:

1. `npm install` all dependencies (if you haven't already).
2. In the root directory, `npm run summarize`. This will generate a `SUMMARY.md` file by going through every file in the repo.
