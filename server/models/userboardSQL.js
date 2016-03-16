var db = require('../db/schema.js').db;
var Promise = require('bluebird');

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
