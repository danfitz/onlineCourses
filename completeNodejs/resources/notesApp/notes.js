const fs = require("fs");
const chalk = require("chalk");

// ***** READ AND WRITE HELPERS *****

// Function that reads JSON file, converts to object, and returns object
const readJson = function(path) {
  // Get JSON from file
  const json = fs.readFileSync(path).toString();
  // Convert to object
  const obj = JSON.parse(json);

  return obj;
};

// Function that converts object to JSON and writes to file
const writeJson = function(path, obj) {
  // Convert object to JSON
  const json = JSON.stringify(obj);

  // Write file at path
  fs.writeFileSync(path, json);   
};


// ***** HELPER READ AND WRITE NOTES FUNCTIONS *****

// Function that reads notes; if notes don't exist, an empty array is returned
const loadNotes = function() {
  try {
    return readJson("notes.json");
  } catch(error) {
    return [];
  };
};

// Function that writes notes from array
const saveNotes = function(notes, message) {
  try {
    writeJson("notes.json", notes);
    console.log(message);
  } catch(error) {
    console.log(chalk.inverse.red("Something went wrong:", error));
  };
};


// ***** NOTES FUNCTIONS *****

const add = function({ title, body }) {
  const notes = loadNotes();

  // If note title exists, exit function
  const existingNote = notes.find(note => note.title === title);

  if (existingNote) {
    console.log(chalk.inverse.yellow("Note title taken..."));
    return;
  };

  // Else save note
  notes.push({
    title,
    body
  });

  saveNotes(notes, chalk.inverse.green(`Note "${title}" added!`));
};

const remove = function({ title }) {
  const notes = loadNotes();

  // Remove note if note title matches input
  const poppedNotes = notes.filter(note => note.title !== title);

  // If note title not found, exit function
  if (notes.length === poppedNotes.length) {
    console.log(chalk.inverse.yellow("Note not found..."));
    return;
  };

  // Else remove note
  saveNotes(poppedNotes, chalk.inverse.green(`Note "${title}" removed!`));
};

const read = function({ title }) {
  const notes = loadNotes();

  const note = notes.find(note => note.title === title);

  if (note) {
    console.log(chalk.bold.inverse(note.title.toUpperCase()));
    console.log(note.body);
  } else {
    console.log(chalk.inverse.yellow("Note not found"))
  };
};

const list = function() {
  const notes = loadNotes();

  console.log(chalk.bold.inverse("Your list of notes:"));
  notes.forEach(note => console.log(note.title));
};

module.exports = {
  add,
  remove,
  read,
  list
};