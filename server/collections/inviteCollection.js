var db = require('../db/schema.js').db;
var Invite = require('../models/invite.js');

var Invites = new db.Collection();
Invites.model = Invite;

module.exports = Invites;
