const express = require('express');
const importItemUtility = require('../utility/itemDataStore');
const UserItem = require('../models/UserItem');
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

router.get('/', (request, response) => {
  response.render('index.ejs');
});

router.get('/catagories', (request, response) => {
  const data = getItemsByCategory();
  response.render('catagories.ejs', {"catalogData": data});
});

router.get('/item-details', (request, response) => {
  const requestParams = request.query;
  itemcode = requestParams['item-code'];
  const itemObj = getItem(itemcode);
  if(typeof itemObj === "undefined" || typeof request.session.user === "undefined"){
    response.redirect('/catagories');
  }
  else{
    UserItem.isItemSaved(request.session.user.id, itemcode).exec(function(error, data) {
      console.log(data);
      if(data.length === 0){
        response.render('item-details.ejs', {"item":itemObj, "isItemSaved": 0});
      }
      else {
        response.render('item-details.ejs', {"item":itemObj, "isItemSaved": 1});
      }
    });

  }
});

router.get('/feedback', (request, response) => {
  const requestParams = request.query;
  itemcode = requestParams['item-code'];
  let itemObj = getItem(itemcode);

  if(typeof itemObj === "undefined"){
    response.redirect('/profile/my-items');
  }

  else {
    const id = request.session.user.id;
    UserItem.isItemSaved(id, String(itemcode)).exec(function(error, data) {
      const currentItem = data[0];
      const stars = parseInt(currentItem.rating);
      itemObj.rating = stars;
      response.render('feedback.ejs', {"item":itemObj, "isTested":currentItem.testedIt});
    });
  }

});

router.get('/about', (request, response) => {
  response.render('about.ejs');
});

router.get('/contact', (request, response) => {
  response.render('contact.ejs');
});



module.exports = router;
