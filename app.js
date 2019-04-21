const express = require('express');
const session = require('express-session');
const http = require('http');
const defaultRouter = require('./routes/DefaultRouter.js');
const userAccessRouter = require('./routes/UserAccessRouter.js');
const userProfileRouter = require('./routes/UserProfileRouter.js');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/accessories', {useNewUrlParser: true});

let app = express();
app.use(session({secret:'secret-session'}));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/', defaultRouter);
app.use('/user', userAccessRouter.router);
app.use('/profile', userProfileRouter);

app.listen(8080, () => {
  console.log("Application started running succesfully at localhost:8080");
});

module.exports = mongoose;
