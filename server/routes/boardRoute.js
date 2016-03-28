var boardController = require('../controllers/boardSQLController.js');

module.exports = function(app) {
  app.post('/create', boardController.createBoard);
  app.post('/board', boardController.getBoard);
  app.post('/profileView', boardController.getProfileView);
  app.post('/populateRoom', boardController.getBoardMembers);
  app.post('/update', boardController.updateBoard);
  // app.post('/delete', boardController.deleteBoard);
  app.post('/invite', boardController.sendInvite);
  app.post('/invitations', boardController.getInviteBoards);
  app.post('/updateInvite', boardController.updateInvite);
};
