// Dependencies
// =============================================================
const express = require("express");
const fs = require("fs");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//saving data into variable
const note = fs.readFileSync(path.join(__dirname, "db/db.json"));
const pNote = JSON.parse(note);

// returns notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//get all notes add Ids and return notes
app.get("/api/notes", (req, res) => {
  for (let i = 0; i < pNote.length; i++) {
    pNote[i].id = i;
  }
  return res.json(pNote);
});

// add a note
app.post("/api/notes", (req, res) => {
  const addNote = req.body;
  pNote.push(addNote);
  res.json(pNote);
  newNote(pNote);
});

//display notes by Id
app.get("/api/notes/:id", function (req, res) {
  res.json(notes[req.params.id]);
});

//writes a new note to database
const newNote = (note) => {
  return fs.writeFileSync("db/db.json", JSON.stringify(note));
};

//delete a note by Id
app.delete("/api/notes/:id", function (req, res) {
  pNote.splice(req.params.id, 1);
  newNote(pNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
