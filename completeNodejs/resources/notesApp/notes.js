const fs = require("fs");

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
const saveNotes = function(notes) {
  writeJson("notes.json", notes);
  console.log("Notes updated!");
};


// ***** NOTES FUNCTIONS *****

const add = function({ title, body }) {
  const notes = loadNotes();

  // If note title exists, exit function
  const notesWithTitle = notes.filter(note => note.title === title);

  if (notesWithTitle.length) {
    console.log("Note title taken! Try a different title...");
    return;
  };

  // Else save note
  notes.push({
    title,
    body
  });

  saveNotes(notes);
};

const remove = function({ title }) {
  const notes = loadNotes();

  // Remove note if note title matches input
  const poppedNotes = notes.filter(note => note.title !== title);

  // If note title not found, exit function
  if (notes.length === poppedNotes.length) {
    console.log("Note title not found. Unable to remove note...");
    return;
  };

  // Else remove note
  saveNotes(poppedNotes);
};

module.exports = {
  add,
  remove
};