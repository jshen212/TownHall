var db = require('../db/schema.js').db;
var Board = require('../models/boardSQL.js');

// creates a "Boards" collection
var Boards = new db.Collection();
Boards.model = Board;

module.exports = Boards;
