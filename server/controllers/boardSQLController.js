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

  // creates a new board
  createBoard: function(req, res, next) {
    var newBoard = new Board({
      board_title: req.body.boardname,
      board_createdby: req.body.id,
      board_lists: JSON.stringify([])
    });
    newBoard.save()
    .then(function(newBoard) {
      Boards.add(newBoard);
      helpers.addJoin(req, newBoard);
      res.status(201).send(newBoard);
    })
    .catch(function(err) {
      console.log('error in creating Board', err);
    });
  },

  // gets all board ids and title related to the user on sign in
  getProfileView: function(req, res, next) {
    var boardIdArray = [];
    helpers.getBoardIds(req, res, function(boardIds) {
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

  // gets a specific board for a signed in user
  getBoard: function(req, res, next) {
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

  // sends an invite to a specific user based on email
  sendInvite: function(req, res, next) {
    knex('Users')
    .whereIn('email', req.body.email)
    .select('id')
    .then(function(userId) {
      // creates a new invitation
      var invitation = new Invite({
        user_id: userId[0].id,
        board_id: req.body.board_id
      });
      invitation.save()
      .then(function(invite) {
        Invites.add(invite);
        res.status(201).send('Invite has been made!');
      });
    });
  },

  // gets all boards that a user is invited to
  getInviteBoards: function(req, res, next) {
    var invitedBoards = [];
    helpers.getInviteIds(req, res, function(boards) {
      boards.forEach(function(boardId) {
        invitedBoards.push(boardId.board_id);
      });
      knex('Boards')
      .whereIn('id', invitedBoards)
      .select('id', 'board_title', 'board_createdby')
      .then(function(boards) {
        res.send(boards);
      })
      .catch(function(err) {
        console.log('error grabbing invited boards', err);
      });
    });
  },

  // gets all board IDs that a user is invited to
  getInviteIds: function(req, res, callback) {
    knex('Invitations')
    .whereIn('user_id', req.body.id)
    .whereIn('response', 0)
    .select('board_id')
    .then(function(boards) {
      callback(boards);
    })
    .catch(function(err) {
      console.log('error in getting invitation board ids', err);
    });
  },

  // updates a specific board
  updateBoard: function(req, res, next) {
    knex('Boards')
    .whereIn('id', req.body.board_id)
    .update({
      board_title: req.body.board_title,
      board_lists: JSON.stringify(req.body.board_lists)
    })
    .then(function() {
      res.status(201).send('board updated');
    })
    .catch(function(err) {
      console.log('error in updating board', err);
    });
  },

  // deletes a specific board
  deleteBoard: function(req, res, next) {
    knex('Joined')
    .whereIn('board_id', req.body.board_id)
    .del()
    .then(function() {
      knex('Invitations')
      .whereIn('board_id', req.body.board_id)
      .del()
      .then(function() {
        knex('Boards')
        .whereIn('id', req.body.board_id)
        .del()
        .then(function() {
          res.status(201).send('board deleted');
        })
        .catch(function(err) {
          console.log('error in deleting boards board', err);
        });
      })
      .catch(function(err) {
        console.log('error in deleting invitations board', err);
      });
    })
    .catch(function(err) {
      console.log('error in deleting joined board', err);
    });
  },

  // gets all board IDs that a user has joined
  getBoardIds: function(req, res, callback) {
    knex('Joined')
    .whereIn('user_id', req.body.id)
    .select('board_id')
    .then(function(boardIds) {
      callback(boardIds);
    })
    .catch(function(err) {
      console.log('error in getting board ids', err);
    });
  },

  // adds a user into a specific board
  addJoin: function(req, board, next) {
    var newJoined = new Joinuser({
      user_id: req.body.id,
      board_id: board.id
    });
    newJoined.save()
    .then(function(joined) {
      Joinusers.add(joined);
    });
  },

  // adds a user to the list of users who have joined a board, then runs a callback
  joinInvited: function(req, res, callback) {
    var newJoined = new Joinuser({
      user_id: req.body.userId,
      board_id: req.body.boardId
    });
    newJoined.save()
    .then(function(joined) {
      Joinusers.add(joined);
      callback();
    });
  },

  // updates an invited user's response to 1 from 0 in the "Invitations table"
  updateInvite: function(req, res, next) {
    console.log(req.body);
    if (req.body.answer === 'yes') {
      helpers.joinInvited(req, res, function() {
        knex('Invitations')
        .where({user_id: req.body.userId, board_id: req.body.boardId})
        .update({
          response: 1
        })
        .then(function() {
          res.status(201).send('hi');
        });
      });
    } else {
      console.log('hi before knex invitations');
      knex('Invitations')
      .where({user_id: req.body.userId, board_id: req.body.boardId})
      .del()
      .then(function() {
        res.status(201).send('deleting record');
      });
    }
  },

  // gets users for a specific board who have joined
  getBoardMembers: function(req, res, next) {
    knex('Invitations')
    .whereIn('board_id', req.body.boardID)
    .select('user_id', 'response')
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      console.log('error in getting invitation board ids', err);
    });
  }
};

module.exports = helpers;
