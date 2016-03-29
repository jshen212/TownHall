var db = require('../db/schema.js').db;
var Invite = require('../models/invite.js');

// creates an "Invites" collection
var Invites = new db.Collection();
Invites.model = Invite;

module.exports = Invites;
