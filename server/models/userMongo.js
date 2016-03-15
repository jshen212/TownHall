var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  uid: Number,
  email: String,
  firstname: String,
  lastname: String,
  image: String,
  friends: Array
});

module.exports = mongoose.model('User', userSchema);
