# README

This website houses notes that I write for online courses or tutorials that I complete in my spare time.

All notes are written in Markdown and are constantly evolving.

## How to Navigate Website

1. Click into a category on the sidebar. (Categories are most commonly programming languages.)
2. Open up any course in that category.
3. Inside of each course, there are notes corresponding to different modules or topics.

Example note for of a module/topic in a course:

* [Big O Notation](https://notes.danfitz.com/javascript/algorithmsdatastructures/a-big-o-notation) (part of [JavaScript Algorithms and Data Structures Masterclass](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/) course)

## Technical Notes (for My Own Use)

### On `SUMMARY.md`

Currently, these notes are hosted using GitBook. When GitBook renders the `.md` files into HTML, it dynamically generates a Table of Contents sidebar containing navigation through all notes. However, it's out of order.

To solve this, I need to provide a `SUMMARY.md` file, which allows me to customize what appears in the Table of Contents sidebar. However, it's tedious to maintain this file manually. So, I've included `gitbook-summary` as an dev package dependency.

Any time an `.md` file is added, removed, or moved:

1. `npm install` or `yarn install` all dependencies (if you haven't already).
2. In the root directory, `npm run summarize` or `yarn summarize`. This will generate a `SUMMARY.md` file by going through every `.md` file in the repo.
