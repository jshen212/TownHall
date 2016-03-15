var boardController = require('../controllers/boardMongoController.js');

module.exports = function(app) {
  // make board
  app.post('/create', boardController.createBoard);
  // get board
  app.get('/fetch', boardController.getBoards);
  // update board
  app.post('/update', boardController.updateBoard);
};
