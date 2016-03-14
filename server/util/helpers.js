var path = require('path');
var fs = require('fs');

module.exports = {
  errorLogger: function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  },
  errorHandler: function(err, req, res, next) {
    res.status(500).send({error: err.message});
  }

};
