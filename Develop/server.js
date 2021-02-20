const express = require('express');
const  db = require("./db/db.json");
const fs = require("fs");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


function updateDB(){
    
}

app.get('/api/notes', (req, res) => {
    
    let result = db;
    console.log(req.query);
    res.json(result);
});

app.post('/api/notes', (req, res) => {
    // let newNote = req.body;
    // db.push(newNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});