var Board = require('../models/boardSQL.js');
var Boards = require('../collections/boardCollection.js');
var Joinuser = require('../models/userboardSQL.js');
var Joinusers = require('../collections/userboardcollection.js');
var Invite = require('../models/invite.js');
var Invites = require('../collections/inviteCollection.js');
var Promise = require('bluebird');
var _ = require('underscore');
var knex = require('../db/schema.js').knex;

var helpers = {
  createBoard: function(req, res, next) {
    var newBoard = new Board({
      board_title: req.body.boardname,
      board_createdby: req.body.id,
      board_lists: JSON.stringify([])
    });
    newBoard.save()
    .then(function(newBoard) {
      Boards.add(newBoard);
      console.log('new board has been created!', newBoard);
      // helpers.addJoin(req, newBoard);
      helpers.addJoin(req, newBoard);
      res.status(201).send('board added');
    })
    .catch(function(err) {
      console.log('error in creating Board', err);
    });
  },
  //When user logs in, this function gets all board ids and title related to the user.
  getDashboardview: function(req, res, next) {
    var boardIdArray = [];
    console.log('sending board...');
    helpers.getBoardsIds(req, function(boardIds) {
      boardIds.forEach(function(boardId) {
        boardIdArray.push(boardId.board_id);
      });
      knex('Boards')
      .whereIn('id', boardIdArray)
      .select('id', 'board_title')
      .then(function(boards) {
        res.send(boards);
      })
      .catch(function(err) {
        console.log('error in getting dashboard view', err);
      });
    });
  },
  getBoard: function(req, res, next) {
    console.log('line44 boardSQLController', req);
    knex('Boards')
    .whereIn('id', req.body.board_id)
    .select()
    .then(function(board) {
      res.send(board);
    })
    .catch(function(err) {
      console.log('error in getting board', err);
    });
  },
  sendInvite: function(req, res, next) {
    knex('Users')
    .whereIn('email', req.body.email)
    .select('id')
    .then(function(userId) {
      var invitation = new Invite({
        user_id: userId[0].id,
        board_id: req.body.board_id
      });
      invitation.save()
      .then(function(invite) {
        Invites.add(invite);
        console.log("invite link has been created!", invite);
        res.status(201).send("Invite has been made!");
      });
    });
  },
  updateBoard: function(req, res, next) {
    knex('Boards')
    .whereIn('id', req.body.board_id)
    .update({
      board_title: req.body.board_title,
      board_lists: JSON.stringify(req.body.board_lists)
    })
    .then(function() {
      console.log('board updated');
      res.status(201).send('board updated');
    })
    .catch(function(err) {
      console.log('error in updating board', err);
    });
  },
  getBoardIds: function(req, res, callback) {
    knex('Joined')
    .whereIn('user_id', req.body.id)
    .select('board_id')
    .then(function(boardIds) {
      console.log('board knex db query result is: ', boardIds);
      callback(boardIds);
    })
    .catch(function(err) {
      console.log('error in getting board ids', err);
    });
  },
  addJoin: function(req, board, next) {
    var newJoined = new Joinuser({
      user_id: req.body.id,
      board_id: board.id
    });
    newJoined.save()
    .then(function(joined) {
      Joinusers.add(joined);
      console.log('new user board connection has been created', joined);
    });
  }

};

module.exports = helpers;
