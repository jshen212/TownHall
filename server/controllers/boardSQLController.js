var Board = require('../models/boardSQL.js');
var Boards = require('../collections/boardCollection.js');
var Promise = require('bluebird');
var _ = require('underscore');
var knex = require('../db/schema.js').knex;

module.exports = {
  createBoard: function(req, res, next) {
    var newBoard = new Board({
      boardname: req.body.boardname
    });
    newBoard.save()
    .then(function(newBoard) {
      Boards.add(newBoard);
      console.log('new board has been created!', newBoard);
      res.status(201).send();
    })
    .catch(function(err) {
      console.log('error in creating Board', err);
    });
  },
  getBoard: function(req, res, next) {
    console.log('sending board...');
    knex('Boards')
    .whereIn('id', req.body.id)
    .select('id', 'boardname')
    .then(function(board) {
      console.log('++line 28 board knex db query result is: ', board);
      res.send(board);
    });
  },
  updateBoard: function(req, res, next) {
    knex('Boards')
    .whereIn('id', req.body.id)
    .update({
      boardname: req.body.boardname
    })
    .then(function() {
      console.log('board updated');
      res.status(201).send('board updated');
    });
  }

};
