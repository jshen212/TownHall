var boardController = require('../controllers/boardSQLController.js');

module.exports = function(app) {
  // create boards
  app.post('/create', boardController.createBoard);
  // get board
  app.post('/board', boardController.getBoard);
  // get profile view
  app.post('/profileView', boardController.getProfileView);
  // get board members
  app.post('/populateRoom', boardController.getBoardMembers);
  // update a board
  app.post('/update', boardController.updateBoard);
  // delete a board
  app.post('/delete', boardController.deleteBoard);
  // invite a user to a board
  app.post('/invite', boardController.sendInvite);
  // get invitations for a board
  app.post('/invitations', boardController.getInviteBoards);
  // update invite to a board
  app.post('/updateInvite', boardController.updateInvite);
};
