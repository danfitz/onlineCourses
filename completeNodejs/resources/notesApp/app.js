const chalk = require("chalk");
const yargs = require("yargs");
const getNotes = require("./notes.js");

yargs.version("1.0.1");

// Add a note command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true
    },
    body: {
      describe: "Note body",
      type: "string"
    }
  },
  handler(yargv) { console.log("Adding a new note: " + yargv.title) }
});

// Remove a note command
yargs.command({
  command: "remove",
  describe: "Remove an existing note",
  handler() { console.log("Removing an existing note...") }
});

// Read a note command
yargs.command({
  command: "read",
  describe: "Read an existing note",
  handler() { console.log("Reading an existing note...") }
});

// List notes command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() { console.log("Listing all notes...") }
});

yargs.parse(); // runs