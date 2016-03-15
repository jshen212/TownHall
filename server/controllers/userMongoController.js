var helpers = require('../util/helpers.js');
var User = require('../models/userMongo.js');
var Board = require('../models/boardMongo.js');
var https = require('https');
var _ = require('underscore');

exports.addProfile = function(req, res) {
  var user = new User({
    uid: req.body.uid,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    image: req.body.image,
    friends: req.body.friends
  });

  user.save(function(err) {
    if (err) {
      throw err;
    }
    res.sendStatus(400);
  });
};

exports.getUserProfile = function(req, res) {
  User.findOne({uid: req.body.uid}, function(err, user) {
    if (err) {
      throw err;
    }
    res.send(user);
  });
};
exports.updateProfile = function(req, res) {
  User.findOne({uid: req.body.uid}, function(err, user) {
    if (err) {
      throw err;
    }

    var updatedUser = user;
    updatedUser.uid = req.body.uid;
    updatedUser.email = req.body.email;
    updatedUser.firstname = req.body.firstname;
    updatedUser.lastname = req.body.lastname;
    updatedUser.image = req.body.image;
    updatedUser.friends = req.body.friends;

    console.log('++line44 updated user is: ', updatedUser);
    User.findOneAndUpdate({uid: req.body.uid}, updatedUser, {new: true}, function(err, user) {
      console.log('updated user = ', user);
      res.send(user);
    });
  });
};
