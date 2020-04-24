const md5 = require('md5')
const db = require('../db')

module.exports.auth = (req, res) => {
    res.render('auth/login')
}

module.exports.postAuth = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get("users").find({email: email}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    let hashedPassword = md5(password);
    if(hashedPassword !== user.password){
        res.redirect('/auth/login');
        return;
    }
    res.cookie("userId1", user.id);
    if (!user.isAdmin){
        res.redirect('/transaction/menu')
    }
    res.redirect('/users')
}