const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000

const bookRouter = require('./router/book.router');
const userRouter = require('./router/user.router');
const transactionRouter = require('./router/transaction.router')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) =>{
    res.render("index")
})

app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/transactions', transactionRouter)

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
