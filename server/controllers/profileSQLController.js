var User = require('../models/userSQL.js');
var Users = require('../collections/userCollection.js');
var Promise = require('bluebird');
var _ = require('underscore');
var knex = require('../db/schema.js').knex;

module.exports = {
  addProfile: function(req, res, next) {
    // adds a new profile to the Users table in userSQL
    console.log('creating a new user!');
    var newUser = new User({
      email: req.body.email,
      name: req.body.name,
      image: req.body.image,
      uid: req.body.uid
    });
    newUser.save()
    .then(function(newUser) {
      Users.add(newUser);
      console.log('user has been created!!!!', newUser);
      res.status(201).send();
    })
    .catch(function(err) {
      console.log('error in creating User', err);
    });
  },
  getUserProfile: function(req, res, next) {
    // sends a request to our sql databse for user profile, match by uid
    console.log('sending user...');
    knex('Users')
    .whereIn('uid', req.body.uid)
    .select('email', 'name', 'image', 'uid', 'id')
    .then(function(user) {
      console.log('++line 35 user knex db query result is: ', user);
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    // updates a specific user's information, match by uid
    knex('Users')
    .whereIn('uid', req.body.uid)
    .update({
      name: req.body.name,
      image: req.body.image
    })
    .then(function() {
      console.log('user updated');
      res.status(201).send('user updated');
    });
  },

  verifyMember: function(req, res, next) {
    // verifies that a user has an account in the database, match by email
    knex('Users')
    .whereIn('email', req.body.email)
    .select('email', 'name', 'image', 'uid', 'id')
    .then(function(user) {
      console.log('++line 55 user knex db query result is: ', user);
      res.send(user);
    });
  },

  getUserName: function(req, res) {
    // gets a user's name, match by id
    knex('Users')
    .whereIn('id', req.body.user_id)
    .select('name', 'image', 'email')
    .then(function(user) {
      console.log('++line 64 user knex db query result is: ', user);
      res.send(user);
    });
  }
};
