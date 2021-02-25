---
title: 'Editing'
part: 2
date: '2021-02-23'
categories: [tools]
tags: [js]
source: [frontend masters]
---

# Editing

## Elements and Styles

You can create a _synthetic event_ like hover or focus or active or visited in the `Elements` panel to view the state of the application (e.g. CSS styles) applied at that point.

## Specificity and DOM Nodes

In a large-scale application, CSS specificity can start becoming an issue: styles clash and override each other.

### Display computed styles

To help ease the problem of specificity, you have access to the **Computed** tab. It shows you the final outcome of the CSS styles.

**Pro tip**: When you click into any of these computed properties, it will send you to the specific CSS declaration where that style originates!

### Finding event listeners

In the **Event Listeners** tab, you can view the DOM nodes that have event listeners attached to them. Then when you click into the source code, it'll take you to the exact line where the event listener callback is set.

**Pro tip**: When you view the source code, you can prettify it by clicking the `{}` symbol at the bottom.

## DOM Breakpoints

If you can _see_ something going wrong (animating incorrectly, wrong colour, etc.) but you don't know where the issue is in the code, you can set a **DOM breakpoint** on the culprit node.

There are 3 types of breakpoints you can choose:

- Break on **node removal** (when the element is removed)
- Break on **attribute modification** (class, data attributes, etc. change)
- Break on **subtree modification** (something inside changes)

## Saving Changes in Workspaces

In the **Sources** section under **Filesystem** (to the left), you can open your source code as a workspace. This is basically using Chrome as an IDE to work on your source code.

**Pro tip**: Chrome will automatically try to map the provided files with the source code files. Whatever is synced, when you edit it in dev tools, it will persist in disk. (For example, updating a text color to red will update the CSS file.)

**Note**: Tools that require a build process to compile down to plain HTML/CSS/JS are not all supported. Some like SCSS are, but others like Webpack aren't. They may receive support down the line though.

## Recent Selection History

There's a useful relationship between the Elements and Console sections: when an element is selected, `$0` in the console automatically stores the node.

If you then select another element, the previous node selected gets stored in `$1` (and so on for `$2` if you select a third element).
