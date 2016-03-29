var db = require('../db/schema.js').db;
var Userboardjoin = require('../models/userboardSQL.js');


var Userboardjoins = new db.Collection();
Userboardjoins.model = Userboardjoin;

module.exports = Userboardjoins;
