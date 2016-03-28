TownHall.controller('authCtrl', function($scope, Auth, User, $firebaseAuth,
  $window, $location, $state) {

    // creates a new firebase instance
    var ref = new Firebase('https://townhallapp.firebaseio.com');
    var authRef = $firebaseAuth(ref);

    $scope.user = {};

    // signs user in
    $scope.signin = function() {
      // checks if user credentials are correct
      ref.authWithPassword({
        email: $scope.user.email,
        password: $scope.user.password
      }, function(err, authData) {
        // uses the following sweet alerts if there is an error
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
          // if no error, the user is logged in and directed to the profile page
        } else {
          User.getUser(authData, function(fetchedData) {
            $scope.saveUserLocalStorage(fetchedData);
            console.log('Authenticated successfully with payload:', authData);
            $state.go('profile');
          });
        }
      });
    };

    // signs user up
    $scope.signup = function() {
      // creates a new user with the filled in details and checks if the user exists
      ref.createUser({email: $scope.user.email, password: $scope.user.password}, function(err, user) {
        // if user does not exist, a new one will be created and user will be signed in
        if (err === null) {
          console.log(user);
          user.email = $scope.user.email;
          user.name = $scope.user.name;
          User.sendUser(user);
          $scope.signin();
          // if user does exist, console will throw an error
        } else {
          console.log('error creating user:', err);
        }
      });
    };

    // signs user out
    $scope.signout = function() {
      // destroys user session
      Auth.signout();
      // directs to signin page
      $state.go('signin');
    };

    // checks user authentication
    $scope.auth = function() {
      // checks if user is authenticated
      Auth.checkAuth();
    };

    // signs user in using google
    $scope.googleSignin = function() {
      // uses google oauth
      ref.authWithOAuthPopup('google', function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          // passes in user info based on google oauth
          var user = {
            uid: authData.uid,
            email: authData.google.email,
            name: authData.google.displayName,
            image: authData.google.profileImageURL
          };
          var createdUser = false;
          var checkIfUserExists = function(data) {
            console.log('checking if user exists');
            // if user exists, user info saved in local storage
            if (data) {
              $scope.saveUserLocalStorage(data);
              // user is directed to profile page
              $state.go('profile');
            } else {
              // if user does not exist, user is created
              if (!createdUser) {
                User.sendUser(user);
                createdUser = true;
              }
              // gets user info after creating user
              User.getUser(user, function(fetchedData) {
                checkIfUserExists(fetchedData);
              });
            }
          };
          // gets the existing user's info
          User.getUser(user, function(fetchedData) {
            checkIfUserExists(fetchedData);
          });
        }
      }, {
        scope: 'email'
      });
    };

    // saves user info into local storage under userInfo key
    $scope.saveUserLocalStorage = function(fetchedData) {
      var userInfo = JSON.stringify(fetchedData[0]);
      localStorage.setItem('userInfo', userInfo);
    };
  });
