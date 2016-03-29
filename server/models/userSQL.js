var db = require('../db/schema.js').db;
var Promise = require('bluebird');

// creates a User model associated with the Users table
var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  initialize: function() {
    console.log('User is created.');
  },
  boards: function() {
    return this.hasMany(Board);
  }
});

module.exports = User;
