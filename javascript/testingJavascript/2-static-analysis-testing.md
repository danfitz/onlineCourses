---
title: 'Static Analysis Testing'
part: 2
date: '2020-04-28'
categories: [tools]
tags: [js, testing]
source: [egghead]
---

# Static Analysis Testing

This section focuses on the tools that help you eliminate bugs related to typos and incorrect types (e.g. providing a string to a function that expects a number).

## Linting with ESLint

**Linting** is the process of analyzing code to flag errors, bugs, stylistic problems, and suspicious constructs. The basic idea to set up `eslint` in particular is to

1. `npm install --save-dev eslint`.
2. In the root directory, include `.eslintrc` with all your configuration.
3. Follow the [docs](https://eslint.org/docs/user-guide/getting-started) to see what you can configure.
4. Run `npx eslint .` to analyze your code.

Here's a sample of what you can configure:

```json
{
  // Tells eslint the type of JavaScript being parsed
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  // This is where the cool configuration happens
  "rules": {
    "strict": ["error", "never"], // doesn't allow explicit use of 'use strict'
    "valid-typeof": "error", // doesn't allow invalid comparisons/typos like typeof 'hello' === 'strng'
    "no-unsafe-negation": "error", // doesn't unclear negations like !key in object instead of !(key in object)
    "no-unused-vars": "error", // self-explanatory
    "no-unexpected-multiline": "error", // doesn't allow extra lines
    "no-undef": "error" // doesn't allow using undeclared/undefined variables
  },
  // Tells eslint expected environment, so it can handle environment specifics
  // Example: `console` is usually an undeclared variable, but it's not in a browser
  "env": {
    "browser": true
  }
}
```

**Pro tip**: The key options for rules are `error`, `warn`, and `off`.

- Use `error` when you want to stop your build altogether. This is good for catching essential errors that you can't allow.
- Use `warn` when you're willing to allow some issues to pass by without disturbing your build. This is useful when you want to give a recommendation or your team is transitioning into eslint.
- Use `off` when you don't need any errors or warnings at all.

### ESLint in VS Code

If you want to catch common ESLint issues in your code editor, you can download `eslint` in VS Code.

This will automatically underline issues for you. You can even run `ctrl + .` or `cmd + .` when hovered you're on top of the error to tell the extension to fix the issue for you.

**Pro tip**: When you run `ctrl + .`, you can also tell ESLint to ignore your issue. This will include an ignore code comment above the issue that ESLint will acknowledge. Example:

```js
// eslint-disable-next-line valid-typeof
typeof name === 'strng';
```

**Note**: Another option is to run `npx eslint . --fix`. ESLint will fix as many issues as it can this way.

### Pre-built ESLint configurations

ESLint has a _ton_ of rules. If you want to piggyback off of the recommended configurations of others, you can use `extends` in `.eslintrc`.

```json
{
  "parserOptions": {
    // ...
  },
  "extends": ["eslint:recommended"], // eslint ships with this recommended config
  // Any rules here override custom config
  "rules": {
    "strict": ["error", "never"]
  }
}
```

**Note**: You can also pass multiple custom configurations, and each successive one overrides the previous.

```json
"extends": ["eslint:recommend", "anotherConfig", "lastConfig"]
```

### Running eslint in scripts

To allow us to run our linter in terminal, we're going to include the following command in `package.json`:

```json
"scripts": {
  "lint": "eslint --ignore-path .gitignore ."
}
```

Note that we include `--ignore-path .gitignore` because 99% of the time, our `.gitignore` will include all the files and folders we don't need to lint (like `build` or `node_modules`).

**Note**: We can also create a `.eslintignore` file as well.

## Prettier

### Running Prettier out of the box

We can easily run Prettier by doing the following:

1. `npm install --save-dev prettier`.
2. Include the following script: `prettier --ignore-path .gitignore --write \"**/*.+(js|json)\""`.
   - Like ESLint, `--ignore-path` ignores files and folders in `.gitignore`.
   - `--write` overwrites all formatting issues in `.js` and `.json` files.

### Configuring Prettier

We can start our configuration by going to [playground](https://prettier.io/playground/) and setting up our preferred options.

Then we can simply copy-paste those options into a `.pretterrc` file.

We end up with something like this:

```json
{
  "arrowParens": "avoid",
  "bracketSpacing": false,
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "printWidth": 80,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false,
  "vueIndentScriptAndStyle": false
}
```

### Prettier in VS Code

To set up Prettier in VS Code, all we need to do is include this in our `settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true // Automatically formats
  // ...
}
```

### Disabling ESLint rules made useless by Prettier

Some ESLint rules add a red underline to stylistic rules that Prettier also fixes. This creates _redundancy_. For example, if we put multiple semicolons like `;;;` at the end of a line, both ESLint and Prettier prohibit this.

In order to remove redundant ESLint rules, just `npm install --save-dev eslint-config-prettier`.

Then include it at the end of your `extends` in `.prettierrc`:

```json
"extends": ["eslint:recommended", "eslint-config-prettier"]
```

## Validate Code through Linter and Prettier

You can't force every developer in your team to use Prettier in their text editor. However, you can enforce verification in your project via a `validate` script that

1. Checks Prettier format.
2. Runs ESLint to check for linting issues.
3. Runs build to test.

```json
{
  "scripts": {
    "build": "babel src --out-dir dist", // or whatever other command
    "lint": "eslint --ignore-path .gitignore .",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write", // The -- means any further arguments get passed to original command
    "check-format": "npm run prettier -- --list-different", // Same here
    "validate": "npm run check-format && npm run lint && npm run build"
  }
}
```

`validate` basically halts the script if anything goes wrong with Prettier or ESLint or build.

In the case of `check-format`, we receive an error and the script stops if Prettier catches formatting problems. The only way to then fix this issue would be to execute `npm run format`. Bam! Now your project enforces formatting.

## TypeScript

ESLint doesn't catch all our errors. Type errors don't get caught:

```js
// Wrong data type
add(1, 'two');

// Accessing wrong property
const obj = { valoo: 'hello' };
console.log(obj.value);
```

To solve this, we can install `typescript`, which handles exactly this sort of thing.

1. `npm install --save-dev typescript`.
2. Write out our code according to TypeScript's specifications.
3. Include a `tsconfig.json`.
4. `npx tsc` (stands for TypeScript Compiler) to analyze code for errors.

Here's a basic configuration:

```json
{
  "compilerOptions": {
    "baseUrl": "./src", // where to look
    "noEmit": true // tells TS not to compile the files (if you already have a compiler like babel)
  }
}
```

Now in our file, we should catch our errors:

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
interface Obj {
  value: string;
}

add(1, 'two'); // throws error for wrong data type
const obj: Obj = { valoo: 'hello' }; // throws error for unacceptable property name
```

Now we can include **type checking** in our `validate` script:

```json
"scripts": {
  "check-types": "tsc",
  "validate": "npm run check-types && npm run check-format && npm run lint && npm run build"
}
```

**Things to note**:

- Make sure to include `.ts` and `.tsx` files for Prettier (and for Babel).
- If you're using Babel, make sure to install `@babel/preset-typescript`, so Babel knows how to compile TypeScript.
  - Be sure to `@babel/preset-typescript` in your `presets` array in `.babelrc`.

### Configure ESLint to check TypeScript

By default, ESLint only check `.js` files, not `.ts` files.

To fix this, we need to

1. Install more packages: `npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser`.
2. Then we add the `--ext .js,.ts,.tsx` flag to `npm run lint` to include TypeScript.
3. Finally, we configure `.eslintrc` to _override_ how it specifically processes TypeScript files. (Think of it like special configuration _inside_ `.eslintrc`.)

```json
"overrides": [
  {
    "files": "**/*.+(ts|tsx)", // applicable files
    "parser": "@typescript-eslint/parser", // define parser
    "parserOptions": {
      "project": "./tsconfig.json" // config file to use
    },
    "plugins": ["@typescript-eslint/eslint-plugin"], // adds more linter rules
    "extends": [ // pre-built rules
      "plugin:@typescript-eslint/eslint-recommended", // Removes ESLint rules that TypeScript makes unnecessary (e.g. typeof comparison)
      "plugin:@typescript-eslint/recommended", // Rule set specific to TypeScript
      "eslint-config-prettier/@typescript-eslint" // Removes ESLint TypeScript rules that Prettier makes unnecessary
    ]
  }
]
```

## Validating before Commit

It would be great if we could have our project run `npm run validate` _before_ any of our team commits code. Doing so ensures that all code passes our validation check before becoming part of the codebase. To do this, we use a **pre-commit hook** using `husky`.

1. `npm install --save-dev husky`. This will add scripts inside our project's `.git/hooks` directory.
2. Add a `.huskyrc` config file. Whenever you `git commit`, it will run the hooks scripts as well, which accesses `.huskyrc` to tell it what to do.

So, in our case, we can tell Husky to run a pre-commit hook that runs `npm run validate`:

```json
// .huskyrc
{
  "hooks": {
    "pre-commit": "npm run validate"
  }
}
```

**Pro tip**: Check out the `.git/hooks` directory for all the hooks you can use with Husky. Pretty powerful stuff!

### Adding auto-formatting

Right now, if Prettier fails the formatting check, we won't be able to commit. A solution we can implement is to Prettier format our code automatically.

To format our code automatically, we can just use `lint-staged`.

1. `npm install --save-dev lint-staged`.
2. Create a `.lintstagedrc` file where you define how to handle different files.
3. Update `pre-commit` hook in `.huskyrc` to use `lint-staged` command.

```json
// In .lintstagedrc...
{
  // Runs these files through eslint
  "*.+(js|ts|tsx)": [
    "eslint"
  ],
  // Automatically writes Prettier changes to file and stages them
  "*.+(js|json|ts|tsx)": [
    "prettier --write",
    "git add"
  ]
}

// In .huskyrc...
{
  "pre-commit": "npm run check-types && lint-staged && npm run build"
}
```

The `pre-commit` is now the automated version of `npm run validate`, where `lint-staged` replaces our custom Prettier and ESLint checks.

**Note**: `lint-staged` does even more. For example, it only checks _staged_ files instead of every file.

## BONUS: Run Validate in Parallel

All of our commands in `npm run validate` don't impact each other, so it's nice to make them run in parallel, since it runs faster.

1. `npm install --save-dev npm-run-all`.
2. Change script to `"validate": "npm-run-all --parallel check-types check-format lint build"`.
