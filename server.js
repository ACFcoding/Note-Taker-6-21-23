const express = require('express');
const path = require('path');
const fs = require("fs")
const PORT = process.env.PORT || 3001;
const {v4: uuidv4} = require('uuid')

const app = express();
//set up all starter variables above here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//re examine above lines

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});
app.get('/api/notes', (req, res) => {
fs.readFile('db/db.json', 'utf-8', (err, data) => {
  //if error, console log the error, else parse the data
  err ? console.log('Error', err) : res.json(JSON.parse(data))
})
});

app.post('/api/notes', (req, res) => {
let title = req.body.title
let text = req.body.text
let createdNote = {
  title, text, id: uuidv4()
}
fs.readFile('db/db.json', 'utf-8', (err, data) => {
  let savedNotes = JSON.parse(data)
  savedNotes.push(createdNote)
  //write the file here
  fs.writeFile('db/db.json', JSON.stringify(savedNotes), (err) =>{
    err ? console.log('Error', err) : console.log('Success,' + createdNote.title + 'has been saved!')
    console.log("createdNote", createdNote)
  })
  res.sendFile(path.join(__dirname, 'public/notes.html'))
})
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);