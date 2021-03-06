const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

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
      type: "string",
      demandOption: true
    }
  },
  handler: notes.add
});

// Remove a note command
yargs.command({
  command: "remove",
  describe: "Remove an existing note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true
    }
  },
  handler: notes.remove
});

// Read a note command
yargs.command({
  command: "read",
  describe: "Read an existing note",
  builder: {
    title: {
      describe: "Note title",
      type: "string",
      demandOption: true
    }
  },
  handler: notes.read
});

// List notes command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: notes.list
});

yargs.parse(); // runs