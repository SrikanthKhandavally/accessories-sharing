let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/accessories', {useNewUrlParser: true});
let Schema = mongoose.Schema;

let Item =  new Schema({
  code: {type:String, required:true},
  name: {type:String, required:true},
  category: {type:String, required:true},
  rating: {type:String, required:true},
  image: {type:String, required:true},
  description: {type:String, required:true},
  directions: String,
  specifications: String,
}, {collection: 'items'});


let itemData = mongoose.model('items', Item);

module.exports.allItemsData = function() {
  return itemData.find();
};
