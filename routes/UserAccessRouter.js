const express = require('express');
const importItemUtility = require('../utility/itemDataStore');
const UserItem = require('../models/UserItem');
const UserDB = require('../models/User');
const bodyParser = require('body-parser');

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
    let usersList = [];
    UserDB.getUsers().exec(function(error, data) {
      usersList = data;
      let max = usersList.length-1;
      let index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      request.session.user = usersList[index];
      response.redirect('/');
    });
  }
});

router.get('/signout', (request, response) => {
  //userProfile.emptyProfiles();
  request.session.destroy();
  response.redirect('/');
});

module.exports = {
  "router":router
};
