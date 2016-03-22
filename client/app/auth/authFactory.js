TownHall.factory('Auth', function($http, $window, $state, $firebaseAuth) {

  var ref = new Firebase('https://townhallapp.firebaseio.com');
  var auth = $firebaseAuth(ref);
  var authRef = new Firebase('https://townhallapp.firebaseio.com/.info/authenticated');

  var signout = function() {
    $window.currentUser = {};
    ref.unauth();
  };

  var checkAuth = function() {
    authRef.on('value', function(snap) {
      if (snap.val() === true) {
        console.log('authenticated');
        return true;
      }
      else {
        console.log('not authenticated');
        return false;
      }
    });
  };

  return {
    signout: signout,
    checkAuth: checkAuth
  };

})

.factory('User', function($http, $window, $state, $firebaseAuth) {

  var sendUser = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/signup',
      data: user
    }).then(function(res) {
      console.log("added user to database", res.data);
    });
  };

  var getUser = function(user, callback) {
    return $http({
      method: 'POST',
      url: 'api/profile/signin',
      data: user
    }).then(function(res) {
      console.log(res.data);
      callback(res.data);
    });
  };

  return {
    sendUser: sendUser,
    getUser: getUser
  };

});
