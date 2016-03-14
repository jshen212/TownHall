var boardController = require('../controllers/boardController.js');

module.exports = function(app) {
  // make board
  app.post('/create', boardController.createBoard);
  // get board
  app.get('/fetch', boardController.getBoard);
  // update board
  app.post('/update', boardController.updateBoard);
};
