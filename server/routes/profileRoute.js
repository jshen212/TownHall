// when user wants to update profile,
// update sql db with updated information
var profileController = require('../controllers/profileSQLController.js');

module.exports = function(app) {
  // add profile
  app.post('/signup', profileController.addProfile);
  // get profile
  app.post('/signin', profileController.getUserProfile);
  // update profile
  app.post('/update', profileController.updateProfile);
  // verify member exists
  app.post('/verify', profileController.verifyMember);
  // get user name from user id
  app.post('/username', profileController.getUserName);
};
