var db = require('../db/schema.js').db;
var Promise = require('bluebird');

// creates an Invite model associated with the Invitations table
var Invite = db.Model.extend({
  tableName: 'Invitations',
  hasTimestamps: true,
  initialize: function() {
    console.log('Invitation link is created.');
  },
  users: function() {
    return this.hasMany(User);
  }
});

module.exports = Invite;
