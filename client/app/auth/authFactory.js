TownHall.factory('Auth', function($http, $window, $state, $firebaseAuth) {

  var createProfile = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/signup',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/signin',
      data: user
    })
    .then(function(res) {
      return res.data;
    });
  };

  var logout = function() {
    ref.unauth();
  };

  var auth = function() {
    Auth.checkAuth();
  }


}
