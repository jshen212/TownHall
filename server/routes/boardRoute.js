var boardController = require('../controllers/boardSQLController.js');

module.exports = function(app) {
  // make board
  app.post('/create', boardController.createBoard);
  //
  app.post('/board', boardController.getBoard);
  // get
  app.post('/profileView', boardController.getProfileView);
  // update board
  app.post('/update', boardController.updateBoard);
  // delete board
  app.post('/delete', boardController.deleteBoard);
  // send invites(create invitations)
  app.post('/invite', boardController.sendInvite);
  // get invititations
  app.post('/invitations', boardController.getInviteBoards);
  // update invitations
  app.post('/populateRoom', boardController.getBoardMembers);
  // hi
  app.post('/updateInvite', boardController.updateInvite);
};
