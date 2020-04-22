const express = require('express')
const shortid = require('shortid')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) =>{
    res.render("transactions/index",{
        transactions: db.get('transactions').value()
    })
})

router.get('/create', (req, res) =>{
    res.render("transactions/create",{
        users: db.get('users').value(),
        books: db.get('books').value()
    })
})

router.post('/create', (req, res) =>{
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect("/transactions");
})

module.exports = router;