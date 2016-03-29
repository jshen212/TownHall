var helpers = require('../util/helpers.js');
var app = require('../server.js');

module.exports = function(app, express) {
  var profileRouter = express.Router();
  var boardRouter = express.Router();

  // direct to proper profile path using the profile route
  app.use('/api/profile', profileRouter);
  // direct to proper board path using the board route
  app.use('/api/board', boardRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('./boardRoute.js')(boardRouter);
  require('./profileRoute.js')(profileRouter);
};
