var db = require('../db/schema.js').db;
var Promise = require('bluebird');

var Board = db.Model.extend({
  tableName: 'Boards',
  hasTimestamps: true,
  initialize: function() {
    console.log('Board is created.');
  },
  users: function() {
    return this.hasMany(User);
  }

});

module.exports = Board;
