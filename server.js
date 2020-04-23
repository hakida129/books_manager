const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const port = 3000

const bookRouter = require('./router/book.router');
const userRouter = require('./router/user.router');
const transactionRouter = require('./router/transaction.router')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.set('view engine', 'pug');
app.set('views', './views');

let count = 0;
app.get('/', (req, res) =>{
    res.cookie("cookies-id", 12345);
    if(req.cookies){
        count= count + 1;
    }
    console.log(`<cookie>: ${count}`);
    res.render("index")
})

app.use(express.static('public'))

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter)

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
