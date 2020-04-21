const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/books', (req, res) => {
  res.render("index", {
    bookList: db.get("")
  });
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

