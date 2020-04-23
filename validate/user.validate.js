module.exports.postAdd = (req, res, next) =>{
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
    next();
}