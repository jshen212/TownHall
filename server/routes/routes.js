var helpers = require('../util/helpers.js');
var app = require('../server.js');

module.exports = function(app, express) {
  var profileRouter = express.Router();
  var boardRouter = express.Router();

  app.use('/api/profile', profileRouter);
  app.use('/api/board', boardRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('./boardRoute.js');
  require('./profileRoute.js');
};
