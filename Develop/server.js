const express = require('express');
const  db = require("./db/db.json");
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function updateDB(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesArray, null, 2));

}

app.get('/api/notes', (req, res) => {
    // Read the db.json file and return all saved notes as JSON
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    // Receives a new note, adds it to db.json, then returns the new note
    let newNote = req.body;
    newNote.id = uuidv4();

    const note = updateDB(newNote, db);
    res.json(note);

    return console.log("Added new note: " + newNote.title);
});

app.get("/api/notes/:id", (req, res) => {
    res.json(db[req.params.id]);
})

app.delete('/api/notes/:id', (req, res) => {
    let deleteNote = db.splice(req.params.id, 1);
    updateDB(deleteNote.body, db);
    console.log("deleted note with id " + req.params.id);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"));
})




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});