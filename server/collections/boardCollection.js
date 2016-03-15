var db = require('../db/schema.js').db;
var Board = require('../models/boardSQL.js');

var Boards = new db.Collection();
Boards.model = Board;

module.exports = Boards;
