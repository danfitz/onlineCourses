const chalk = require("chalk");

const getNotes = require("./notes.js");

// console.log(getNotes());

const msg = chalk.bgGreen.bold("Your console message: %s");

console.log(msg, "APP SUCCESSFULLY BUILT AND DEPLOYED");

// console.log(chalk.bgGreen.bold._styles);