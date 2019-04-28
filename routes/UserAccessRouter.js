const express = require('express');
const importItemUtility = require('../utility/itemDataStore');
const UserItem = require('../models/UserItem');
const UserDB = require('../models/User');
const bodyParser = require('body-parser');

const { body, check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

let urlEncodedParser = bodyParser.urlencoded({extended: false});
const getItems = importItemUtility.getItems;
const getItem = importItemUtility.getItem;
const getItemsByCategory = importItemUtility.getItemsByCategory;

const router = express.Router();

router.use( (request, response, next) => {
    response.locals.user = request.session.user;
    next();
});

router.get('/signin', (request, response) => {
  if(!request.session.user){
    if(typeof request.query.error !== "undefined"){
      response.render('login.ejs', {error: request.query.error});
    }
    else {
        response.render('login.ejs', {error: 0});
    }
  }
});

router.post('/authentication', urlEncodedParser,
[
  check('username').isEmail(),
  check('password').isLength({ min: 5 })
  // ,body('username')
  // .isEmail()
  // .normalizeEmail(),
  // sanitizeBody('notifyOnReply').toBoolean()
] ,(request, response) => {

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    response.redirect('/user/signin?error=2');
  }

  else {
    const queryString = request.body;
    const username = queryString['username'].toLowerCase();
    console.log(username);
    const password = queryString['password'];

    UserDB.getUserByCredentials(username, password).exec(function(error, data) {
      console.log(data);
      if(data.length === 1){
        request.session.user = data[0];
        UserItem.getItems(request.session.user.id).exec(function(error, data){
          response.redirect('/profile/my-items');
        });
      }
      else {
          response.redirect('/user/signin?error=1');
      }
    });
  }

});

router.get('/signout', (request, response) => {
  request.session.destroy();
  response.redirect('/');
});

module.exports = {
  "router":router
};
