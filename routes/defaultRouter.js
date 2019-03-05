const express = require('express');
const importItemUtility = require('../utility/itemDataStore');

const getItems = importItemUtility.getItems;
const getItem = importItemUtility.getItem;
const getItemsByCategory = importItemUtility.getItemsByCategory;

const router = express.Router();

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
  if(typeof itemObj === "undefined"){
    response.redirect('/catagories');
  }
  else{
    response.render('item-details.ejs', {"item":itemObj});
  }
});

router.get('/my-items', (request, response) => {
  response.render('my-items.ejs');
});

router.get('/feedback', (request, response) => {
  const requestParams = request.query;
  itemcode = requestParams['item-code'];
  const itemObj = getItem(itemcode);

  if(typeof itemObj === "undefined"){
    response.redirect('/catagories');
  }

  else {
    response.render('feedback.ejs', {"item":itemObj});
  }
});

router.get('/about', (request, response) => {
  response.render('about.ejs');
});

router.get('/contact', (request, response) => {
  response.render('contact.ejs');
});

module.exports = router;
