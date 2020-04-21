const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const shortid = require('shortid');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

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
  req.body.id = shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect("/books");
});

app.get("/books/:id/delete", (req, res) =>{
  let id = req.params.id
  db.get("books").remove({id: id}).write();
  res.redirect("/books");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

