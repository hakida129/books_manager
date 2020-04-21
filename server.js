const express = require('express');
const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/books', (req, res) => {
  res.render("index", {
    bookList: db.get("books").value()
  });
});

app.get('/books/add', (req, res) => {
  res.render("add/index")
});

app.post("/books/add", (req, res) =>{
  db.get("books").push(req.body).write();
  res.redirect("/books");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

