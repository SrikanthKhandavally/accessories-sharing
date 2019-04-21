const express = require('express');
const importItemUtility = require('../utility/itemDataStore');
const  UserDB = require('../models/User');
const UserItem = require('../models/UserItem');
const bodyParser = require('body-parser');
const userAccessRouter = require('./userAccessRouter');
const signinUser = userAccessRouter.signinUser;

let urlEncodedParser = bodyParser.urlencoded({extended: false});
const getItems = importItemUtility.getItems;
const getItem = importItemUtility.getItem;
const getItemsByCategory = importItemUtility.getItemsByCategory;

const router = express.Router();

router.use( (request, response, next) => {
    response.locals.user = request.session.user;
    next();
});

router.get('/my-items', (request, response) => {
  if(!request.session.user){
    let usersList = [];
    UserDB.getUsers().exec(function(error, data) {
      usersList = data;
      let max = usersList.length-1;
      let index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
      request.session.user = usersList[index];
      response.locals.user = request.session.user;

      UserItem.getItems(request.session.user.id).exec(function(error, data){
        response.render('my-items.ejs', {data: data});
      });

    });
  }
  else {
    UserItem.getItems(request.session.user.id).exec(function(error, data){
      response.render('my-items.ejs', {data: data});
    });
  }
});


router.get('/save', (request, response) => {
  const requestParams = request.query;
  itemcode = requestParams['item-code'];
  const id = request.session.user.id;
  const item = importItemUtility.getItemByCode(itemcode);
  let newUserItem = {"id": id, "code": itemcode, "item": item.name, "category": item.category, "rating": "", "testedIt": "false"};
  let userItem = new UserItem.UserItemModel(newUserItem);

  UserItem.UserItemModel.collection.insertOne(userItem, function(error, data){
    response.redirect('/profile/my-items');
  });

});

router.post('/update-rating', urlEncodedParser, (request, response) => {
  const queryString = request.body;
  const itemcode = queryString['item-code'];
  const id = request.session.user.id;
  const rating = queryString['user-rating'];
  UserItem.isItemSaved(id, itemcode).exec(function(error, data) {
    const currentItem = data[0];
    if(typeof currentItem !== "undefined"  && (parseInt(rating) >=0 && parseInt(rating) <= 5)){
      let updatedUserItem =
        {"id": id, "code": itemcode, "item": currentItem.item, "category": currentItem.category, "rating": String(rating), "testedIt": currentItem.testedIt};
        let condition = {id:id, code:itemcode};
        UserItem.UserItemModel.updateOne(condition, updatedUserItem, function(error, data){
          response.redirect('/profile/my-items');
        });
    }
    else {
      response.redirect('/profile/my-items');
    }
  });
});

router.post('/update-tested', urlEncodedParser, (request, response) => {
  const queryString = request.body;
  const itemcode = queryString['item-code'];
  const testedIt = queryString['tested-it'];
  const id = request.session.user.id;
  UserItem.isItemSaved(id, itemcode).exec(function(error, data) {
    const currentItem = data[0];
    if(typeof currentItem !== "undefined"){
      let updatedUserItem =
        {"id": id, "code": itemcode, "item": currentItem.item, "category": currentItem.category, "rating": currentItem.rating, "testedIt": testedIt};
        let condition = {id:id, code:itemcode};
        UserItem.UserItemModel.updateOne(condition, updatedUserItem, function(error, data){
          response.redirect('/profile/my-items');
        });
    }
    else {
      response.redirect('/profile/my-items');
    }
  });
});

router.post('/delete', urlEncodedParser, (request, response) => {
  const queryString = request.body;
  const itemcode = queryString['item-code'];
  const userId = request.session.user.id;
  UserItem.UserItemModel.find({id: userId, code: itemcode}).deleteOne(function(error, data){
    response.redirect('/profile/my-items');
  });
});

module.exports = router;
