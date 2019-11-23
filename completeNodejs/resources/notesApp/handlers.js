const fs = require("fs");

const handlers = {
  add: ({ title, body }) => {
    // Get current JSON storage
    const notesJson = fs.readFileSync("notes.json").toString();
    // Get notes array from object conversion
    const notesObj = JSON.parse(notesJson);

    // Add note to notes array
    notesObj.notes.push({
      title,
      body
    });

    // Convert back to JSON
    const outputJson = JSON.stringify(notesObj);

    // Write file
    fs.writeFileSync("notes.json", outputJson);    
  },
  remove: ({ title }) => {
    // Get current JSON storage
    const notesJson = fs.readFileSync("notes.json").toString();
    // Get notes array from object conversion
    const notesObj = JSON.parse(notesJson);

    // Remove note if note title matches input
    notesObj.notes = notesObj.notes.filter(note => note.title !== title);

    // Convert back to JSON
    const outputJson = JSON.stringify(notesObj);

    // Write file
    fs.writeFileSync("notes.json", outputJson);
  }
};

module.exports = handlers;