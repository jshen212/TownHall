var Board = require('../models/boardSQL.js');
var Boards = require('../collections/boardCollection.js');
var Promise = require('bluebird');
var _ = require('underscore');
var knex = require('../db/schema.js').knex;

var helpers = {
  createBoard: function(req, res, next) {
    // var newBoard = new Board({})
  },
  getBoard: function(req, res, next) {

  },
  updateBoard: function(req, res, next) {

  }

};

module.exports = helpers;
