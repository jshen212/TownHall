// when user wants to update profile,
// update sql db with updated information
var profileController = require('../controllers/profileSQLController.js');

module.exports = function(app) {
  // add profile
  app.post('/signup', profileController.addProfile);
  // get profile
  app.get('/signin', profileController.getUserProfile);
  // update profile
  app.post('/update', profileController.updateProfile);
};
