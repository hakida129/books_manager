const express = require('express')
const shortid = require('shortid')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
    res.render("books/index", {
    bookList: db.get("books").value()
});
});

router.get('/add', (req, res) => {
    res.render("books/add")
});

router.post("/add", (req, res) =>{
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();
    res.redirect("/books");
});

router.get("/:id/delete", (req, res) =>{
    let id = req.params.id
    db.get("books").remove({id: id}).write();
    res.redirect("/books");
});

router.get("/:id/update", (req, res) => {
    let id = req.params.id;
    res.render("books/update",{
        id: id,
        book: db.get("books").find({id: id}).value()
    });
});

router.post("/update", (req, res) => {
    let id = req.body.id
    db.get('books')
    .find({ id: id })
    .assign({ title: req.body.title })
    .write()
    res.redirect("/books");
}); 

module.exports = router;