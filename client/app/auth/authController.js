TownHall.controller('authCtrl', function($scope, Auth, User, $firebaseAuth, $window, $location, $state) {

  var ref = new Firebase('https://townhallapp.firebaseio.com');
  var authRef = $firebaseAuth(ref);

  $scope.user = {};

  $scope.signin = function() {
    ref.authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }, function(error, authData) {
      if (err) {
        switch (err.code) {
          case 'INVALID_EMAIL':
            console.log('The specified user account email is invalid.');
            break;
          case 'INVALID_PASSWORD':
            console.log('The specified user account password is incorrect.');
            break;
          case 'INVALID_USER':
            console.log('The specified user account does not exist.');
            break;
          default:
            console.log('Error logging user in:', error);
        }
      } else {
        $window.currentUser = User.getUser(authData);
        console.log('Authenticated successfully with payload:', authData);
        $state.go('landing');
      }
    });
  };

  $scope.signup = function() {
    ref.createUser({email: $scope.user.email, password: $scope.user.password}, function(err, user) {
      if (err === null) {
        console.log(user);
        user.name = $scope.user.name;
        User.sendUser(user);
        $scope.signin();
      } else {
        console.log("error creating user:", err);
      }
    });
  };

  $scope.logout = function() {
    Auth.logout();
  };

  $scope.auth = function() {
    Auth.checkAuth();
  };

  $scope.fbLogin = function() {
    Auth.fbLogin();
  };


});
