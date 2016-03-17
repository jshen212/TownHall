TownHall.factory('Auth', function($http, $window, $state, $firebaseAuth) {

  return {};

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

  var getUser = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/signin',
      data: user
    }).then(function(res) {
      console.log('we got the user!', res.data);
      return res.data;
    });
  };

  return {
    sendUser: sendUser,
    getUser: getUser
  };

});
