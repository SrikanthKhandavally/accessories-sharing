const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {
  response.render('index.ejs');
});

router.get('/catagories', (request, response) => {
  response.render('catagories.ejs');
});

router.get('/item-details', (request, response) => {
  response.render('item-details.ejs');
});

router.get('/my-items', (request, response) => {
  response.render('my-items.ejs');
});

module.exports = router;
