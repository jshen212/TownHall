TownHall.factory('Auth', function($http, $window, $state, $firebaseAuth) {

  var ref = new Firebase('https://townhallapp.firebaseio.com');
  var auth = $firebaseAuth(ref);
  var authRef = new Firebase('https://townhallapp.firebaseio.com/.info/authenticated');

  // signout function
  var signout = function() {
    // removes current user
    $window.currentUser = {};
    // deletes user info from local storage
    localStorage.removeItem('userInfo');
    // designates the user an unauthorized
    ref.unauth();
  };

  // gets authentication from firebase
  var getAuth = function() {
    return ref.getAuth();
  };

  // checks if user is authenticated
  var checkAuth = function() {
    authRef.on('value', function(snap) {
      // if user is authenticated, console will log "authenticated"
      if (snap.val() === true) {
        console.log('authenticated');
        return true;
        // if user is not authenticated, console will log "not authenticated"
      } else {
        console.log('not authenticated');
        return false;
      }
    });
  };

  return {
    signout: signout,
    getAuth: getAuth,
    checkAuth: checkAuth,
    auth: auth
  };
})

.factory('User', function($http, $window, $state, $firebaseAuth, $firebaseArray,
  $firebaseObject, FirebaseUrl) {

    // creates a new firebase instance using the firebase url with a "users" suffix
    var usersRef = new Firebase(FirebaseUrl + 'users');
    // creates an array in firebase of the users
    var users = $firebaseArray(usersRef);
    var Users = {
      // searches firebase and fetches the user profile
      getProfile: function(uid) {
        return $firebaseObject(usersRef.child(uid));
      },
      // searches firebase and fetches the user display name
      getDisplayName: function(uid) {
        return users.$getRecord(uid).displayName;
      },
      // stores users array
      all: users,
      // searches firebase and fetches the user gravatar
      gravatar: function(uid) {
        return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
      },
      // sets a user's online property to true if they are logged in
      setOnline: function(uid) {
        var connected = $firebaseObject(connectedRef);
        var online = $firebaseArray(usersRef.child(uid + '/online'));

        connected.$watch(function() {
          if (connected.$value === true) {
            online.$add(true).then(function(connectedRef) {
              connectedRef.onDisconnect().remove();
            });
          }
        });
      }
    };

    // saves user info in the database
    var sendUser = function(user) {
      return $http({
        method: 'POST',
        url: 'api/profile/signup',
        data: user
      }).then(function(res) {
        console.log('added user to database', res.data);
      });
    };

    // fetches user info in the database and runs a callback on the returned data
    var getUser = function(user, callback) {
      return $http({
        method: 'POST',
        url: 'api/profile/signin',
        data: user
      }).then(function success(res) {
        if (res.data.length === 0) {
          callback(false);
        } else {
          console.log(res.data);
          callback(res.data);
        }
      });
    };
    
    return {
      sendUser: sendUser,
      getUser: getUser,
      Users: Users
    };
  });
