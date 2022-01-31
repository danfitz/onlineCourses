const fs = require("fs");

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday"
// };

// const bookJSON = JSON.stringify(book);

// const rebook = JSON.parse(bookJSON);

// fs.writeFileSync("1-json.json", bookJSON);

// const dataBuffer = fs.readFileSync("1-json.json");
// console.log(dataBuffer.toString());

const dataBuffer = fs.readFileSync("1-json.json");
const data = JSON.parse(dataBuffer.toString());
data.name = "Dan Fitz";
data.age = 55;
const json = JSON.stringify(data);
fs.writeFileSync("1-json.json", json);