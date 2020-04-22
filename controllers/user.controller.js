const shortid = require('shortid')
const db = require('../db')

module.exports.index = (req, res) =>{
    res.render('users/index',{
        users: db.get("users").value()
    });   
}

module.exports.add = (req, res) =>{
    res.render('users/add')
}

module.exports.postAdd = (req, res) =>{
    req.body.id = shortid.generate();
    let errors = [];

    if(!req.body.name){
        errors.push("Name is required.")
    }
    if(req.body.name.length > 30){
        errors.push("Name is long more 30!.")
    }
    if(!req.body.phone){
        errors.push("Phone is required.")
    } 
    if(errors.length){
        res.render('users/add',{
            errors: errors,
            values: req.body
        })
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect("/users");
}

module.exports.delete = (req, res) =>{
    let id = req.params.id;
    db.get('users').remove({id: id}).write();
    res.redirect("/users");
}

module.exports.update = (req, res) =>{
    let id = req.params.id;
    res.render("users/update",{
        id: id,
        book: db.get("users").find({id: id}).value()
    });
}

module.exports.postUpdate = (req, res) =>{
    let id = req.body.id;
    db.get('users').find({id: id}).assign({ name: req.body.name}).write();
    res.redirect("/users");
}