let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/accessories', {useNewUrlParser: true});
let Schema = mongoose.Schema;

let User = new Schema({
  id: {type:String, required:true},
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  email: {type:String, required:true}
}, {collections: 'users'});

let userData = mongoose.model('users', User);

module.exports.getUsers = function(){
  return userData.find();
};
