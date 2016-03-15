var db = require('../db/schema.js').db;
var User = require('../models/userSQL.js');

var Users = new db.Collection();
Users.model = User;

module.exports = Users;
