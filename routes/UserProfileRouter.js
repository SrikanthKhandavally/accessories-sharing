const express = require('express');
const importItemUtility = require('../utility/itemDataStore');
const  UserDB = require('../models/User');
const UserItem = require('../models/UserItem');
const bodyParser = require('body-parser');
const userAccessRouter = require('./userAccessRouter');
const signinUser = userAccessRouter.signinUser;

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

router.get('/my-items', (request, response) => {
  if(!request.session.user){
    response.redirect('/user/signin');
  }
  else {
    UserItem.getItems(request.session.user.id).exec(function(error, data){
      response.render('my-items.ejs', {data: data});
    });
  }
});


router.get('/save',  [
check('item-code').exists(),
check('item-code').isLength({ min:4, max:4 }),
], (request, response) => {
  const errors = validationResult(request);
  const requestParams = request.query;
  if(!errors.isEmpty()){
    response.redirect('/profile/my-items');
  }
  else {
    itemcode = requestParams['item-code'];
    const id = request.session.user.id;
    const item = importItemUtility.getItemByCode(itemcode);
    if(typeof item !== "undefined") {
      let newUserItem = {"id": id, "code": itemcode, "item": item.name, "category": item.category, "rating": "", "testedIt": "false"};
      let userItem = new UserItem.UserItemModel(newUserItem);

      UserItem.UserItemModel.collection.insertOne(userItem, function(error, data){
        response.redirect('/profile/my-items');
      });
    }
    else {
      response.redirect('/profile/my-items');
    }

  }

});

router.post('/update-rating', urlEncodedParser, [
check('item-code').exists(),
check('user-rating').exists(),
check('item-code').isLength({ min:4, max:4 }),
check('user-rating').isInt({ gt: 0, lt:6 }),
], (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.redirect('/profile/my-items');
  }
  else {
    const queryString = request.body;
    const itemcode = queryString['item-code'];
    const id = request.session.user.id;
    const rating = queryString['user-rating'];
    UserItem.isItemSaved(id, itemcode).exec(function(error, data) {
      const currentItem = data[0];
      if(typeof currentItem !== "undefined"){
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
  }

});

router.post('/update-tested', urlEncodedParser, [
check('item-code').exists(),
check('tested-it').exists(),
check('tested-it').isIn(["true", "false"]),
check('item-code').isLength({ min:4, max:4 }),
], (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.redirect('/profile/my-items');
  }
  else {
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
  }

});

router.post('/delete', urlEncodedParser, [
check('item-code').exists(),
check('item-code').isLength({ min:4, max:4 }),
], (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.redirect('/profile/my-items');
  }
  else {
    const queryString = request.body;
    const itemcode = queryString['item-code'];
    const userId = request.session.user.id;
    UserItem.UserItemModel.find({id: userId, code: itemcode}).deleteOne(function(error, data){
      response.redirect('/profile/my-items');
    });
  }
});

const sanitizeUserItemData = (data) => {
  let sanitizedData = data.map((item) => {
    let Data = {};
    Data['id'] = String(item['id']).trim();
    Data['code'] = String(item['code']).trim();
    Data['item'] = String(item['item']).trim();
    Data['category'] = String(item['category']).trim();
    Data['rating'] = String(item['rating']).trim();
    Data['testedIt'] = String(item['testedIt']).trim();
    return Data;
  });
  console.log(sanitizedData);
  return sanitizedData;
};

module.exports = router;
