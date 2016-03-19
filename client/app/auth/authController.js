TownHall.controller('authCtrl', function($scope, Auth, User, $firebaseAuth, $window, $location, $state) {

  var ref = new Firebase('https://townhallapp.firebaseio.com');
  var authRef = $firebaseAuth(ref);

  $scope.user = {};

  $scope.signin = function() {
    ref.authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }, function(err, authData) {
      if (err) {
        switch (err.code) {
          case 'INVALID_EMAIL':
            sweetAlert('Oops', 'The specified user account email is invalid.', 'error');
            break;
          case 'INVALID_PASSWORD':
            sweetAlert('Oops', 'The specified user account password is incorrect.', 'error');
            break;
          case 'INVALID_USER':
            sweetAlert('Oops', 'The specified user account does not exist.', 'error');
            break;
          default:
            sweetAlert('Oops...', 'Something went wrong!', 'error');
        }
      } else {
        User.getUser(authData, function(fetchedData) {
          $scope.saveUserLocalStorage(fetchedData);
          console.log('Authenticated successfully with payload:', authData);
          $state.go('profile');
        });
      }
    });
  };

  $scope.signup = function() {
    ref.createUser({email: $scope.user.email, password: $scope.user.password}, function(err, user) {
      if (err === null) {
        console.log(user);
        user.email = $scope.user.email;
        user.name = $scope.user.name;
        User.sendUser(user);
        $scope.signin();
      } else {
        console.log('error creating user:', err);
      }
    });
  };

  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  $scope.auth = function() {
    Auth.checkAuth();
  };

  $scope.googleSignin = function() {
    ref.authWithOAuthPopup('google', function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
        var user = {
          uid: authData.uid,
          email: authData.google.email,
          name: authData.google.displayName,
          image: authData.google.profileImageURL
        };
        User.getUser(user, function(fetchedData) {
          if (!fetchedData) {
            User.getUser(user, function(fetchedData) {
              console.log(fetchedData);
              $scope.saveUserLocalStorage(fetchedData);
              console.log('2nd google auth with payload:', authData);
              $state.go('profile');
            });
          } else {
            $scope.saveUserLocalStorage(fetchedData);
            console.log('google auth with payload:', authData);
            $state.go('profile');
          }
        });
        // User.sendUser(user);
      }
    }, {
      scope: 'email'
    });
  };

  $scope.saveUserLocalStorage = function(fetchedData) {
    var userInfo = JSON.stringify(fetchedData[0]);
    localStorage.setItem('userInfo', userInfo);
  };

});
