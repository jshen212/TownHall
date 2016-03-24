TownHall.factory('Auth', function($http, $window, $state, $firebaseAuth) {

  var ref = new Firebase('https://townhallapp.firebaseio.com');
  var auth = $firebaseAuth(ref);
  var authRef = new Firebase('https://townhallapp.firebaseio.com/.info/authenticated');

  var signout = function() {
    $window.currentUser = {};
    localStorage.removeItem('userInfo');
    ref.unauth();
  };

  var checkAuth = function() {
    authRef.on('value', function(snap) {
      if (snap.val() === true) {
        console.log('authenticated');
        return true;
      } else {
        console.log('not authenticated');
        return false;
      }
    });
  };

  return {
    signout: signout,
    checkAuth: checkAuth,
    auth: auth
  };

})

.factory('User', function($http, $window, $state, $firebaseAuth, $firebaseArray, $firebaseObject, FirebaseUrl) {

  var usersRef = new Firebase(FirebaseUrl + 'users');
  var users = $firebaseArray(usersRef);
  var Users = {
    getProfile: function(uid) {
      return $firebaseObject(usersRef.child(uid));
    },
    getDisplayName: function(uid) {
      return users.$getRecord(uid).displayName;
    },
    all: users,
    gravatar: function(uid) {
      return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    },
    // sets the property of online whenever someone is loggedin.
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

  var sendUser = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/signup',
      data: user
    }).then(function(res) {
      console.log('added user to database', res.data);
    });
  };

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
