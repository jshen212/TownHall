var helpers = require('../util/helpers.js');
var Board = require('../models/boardMongo.js');
var User = require('../models/userMongo.js');
var https = require('https');
var _ = require('underscore');

// creates a board using the user and board information
exports.createBoard = function(req, res) {

  // parses current user's information to be passed into the createdBy property in the board
  var currentUser = {
    uid: req.body.uid,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    image: req.body.image
  };

  // creates a new board
  var board = new Board({
    createdBy: currentUser,
    boardname: req.body.boardname,
    boardMembers: [currentUser]
  });
  board.save(function(err) {
    if (err) {
      throw err;
    }
    res.send(board);
  });
};

// gets all the boards for a specific list of boardmembers
exports.getBoards = function(req, res) {
  Board.find({boardMembers: req.body.boardmembers}, function(err, boards) {
    if (err) {
      throw err;
    }
    res.send(boards);
  });
};
exports.updateBoard = function(req, res) {
};
