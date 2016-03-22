var boardController = require('../controllers/boardSQLController.js');

module.exports = function(app) {
  // make board
  app.post('/create', boardController.createBoard);
  //
  app.post('/board', boardController.getBoard);
  // get
  app.post('/dashboard', boardController.getDashboardview);
  // update board
  app.post('/update', boardController.updateBoard);
  // send invites(create invitations)
  app.post('/invite', boardController.sendInvite);
  // get invititations
  app.post('/invitations', boardController.getInviteBoards);
};
