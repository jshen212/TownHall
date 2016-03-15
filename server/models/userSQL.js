var db = require('../db/schema.js').db;
var Promise = require('bluebird');

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
