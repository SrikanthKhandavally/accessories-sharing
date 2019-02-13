const express = require('express');
const http = require('http');
const defaultRouter = require('./routes/defaultRouter.js');

let app = express();
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/', defaultRouter);

app.listen(8080, () => {
  console.log("Application started running succesfully at localhost:8080");
});
