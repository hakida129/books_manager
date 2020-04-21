const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const shortid = require('shortid');
const port = 3000

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) =>{
    res.render("index")
})

app.get('/books', (req, res) => {
    res.render("books/index", {
    bookList: db.get("books").value()
});
});

app.get('/books/add', (req, res) => {
    res.render("books/add")
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

app.get("/books/:id/update", (req, res) => {
    let id = req.params.id;
    res.render("books/update",{
        id: id,
        book: db.get("books").find({id: id}).value()
    });
});

app.post("/books/update", (req, res) => {
    let id = req.body.id
    db.get('books')
    .find({ id: id })
    .assign({ title: req.body.title })
    .write()
    res.redirect("/books");
}); 

app.get("/users", (req, res) =>{
    res.render('users/index',{
        users: db.get("users").value()
    });   
});

app.get("/users/add", (req, res) =>{
    res.render('users/add')
})

app.post("/users/add", (req, res) =>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
})

app.get("/users/:id/delete", (req, res) =>{
    let id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("/users");
})

app.get("/users/:id/update", (req, res) =>{
    let id = req.params.id;
    res.render("users/update",{
        id: id,
        book: db.get("users").find({id: id}).value()
    });
})

app.post("/users/update", (req, res) =>{
    let id = req.body.id;
    db.get('users').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/users");
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
