const shortid = require('shortid')
const db = require('../db')

module.exports.index = (req, res) =>{
    res.render("transactions/index",{
        transactions: db.get('transactions').value()
    })
}

module.exports.create = (req, res) =>{
    res.render("transactions/create",{
        users: db.get('users').value(),
        books: db.get('books').value()
    })
}

module.exports.postCreate = (req, res) =>{
    req.body.id = shortid.generate();
    req.body.isComplete = false;
    req.body.userName = db.get("users").find({id: req.body.userId}).value()
    req.body.bookName = db.get("books").find({id: req.body.bookId}).value()
    db.get('transactions').push(req.body).write();
    res.redirect("/transactions");
}

module.exports.complete = (req, res) =>{
    let id = req.params.id;
    if (!db.get('transactions').find({id : id}).value()){
        res.redirect("/transactions");
        return;
    }
    db.get('transactions').find({id: id}).assign({ isComplete: true}).write();
    res.redirect("/transactions");
}
