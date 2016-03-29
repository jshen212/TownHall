var db = require('../db/schema.js').db;
var Promise = require('bluebird');

// creates a Userboardjoin model associated with the Joined table, which shows which users are part of which boards
var Userboardjoin = db.Model.extend({
  tableName: 'Joined',
  hasTimestamps: true,
  initialize: function() {
    console.log('User to board connection is created.');
  },
  user: function() {
    return this.belongsTo(User, 'id');
  }
});

module.exports = Userboardjoin;
