const express = require('express')
const shortid = require('shortid')

const db = require('../db')

const router = express.Router()

router.get("/", (req, res) =>{
    res.render('users/index',{
        users: db.get("users").value()
    });   
});

router.get("/add", (req, res) =>{
    res.render('users/add')
})

router.post("/add", (req, res) =>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
})

router.get("/:id/delete", (req, res) =>{
    let id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("/users");
})

router.get("/:id/update", (req, res) =>{
    let id = req.params.id;
    res.render("users/update",{
        id: id,
        book: db.get("users").find({id: id}).value()
    });
})

router.post("/update", (req, res) =>{
    let id = req.body.id;
    db.get('users').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/users");
})

module.exports = router;