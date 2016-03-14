// when user wants to update profile,
// update sql db with updated information
var profileController = require('../controllers/profileController.js');

module.exports = function(app) {
  // add profile
  app.post('/add', profileController.addProfile);
  // get profile
  app.get('/user', profileController.getUserProfile);
  // update profile
  app.post('/update', profileController.updateProfile);
};
