TownHall.factory('dataFactory', function($http) {

  // uses boardID to fetch all users that are part of a specific board
  var getMembers = function(boardID) {
    return $http({
      method: 'POST',
      url: 'api/board/populateRoom',
      data: boardID
    }).then(function(res) {
      return res.data;
    }, function error(response) {
      console.log('error', response);
    });
  };

  // takes board info and fetches specific board from database
  // then sends board data to the controller
  var loadBoard = function(board, callback) {
    $http({
      method: 'POST',
      url: 'api/board/board',
      data: board
    }).then(function success(data) {
      var board = data.data[0];
      callback(board);
    }, function error(response) {
      console.log('error', response);
    });
  };

  // takes board info and adds it to the database
  // runs callback on the board data on the response
  var createBoard = function(board, callback) {
    $http({
      method: 'POST',
      url: 'api/board/create',
      data: board
    }).then(function success(board) {
      callback(board.data);
    }, function error(response) {
      console.log('error', response);
    });
  };

  // updates a specific board's data and returns true if the update is successful
  var updateBoard = function(board) {
    console.log('updateBoard firing');
    return $http({
      method: 'POST',
      url: 'api/board/update',
      data: board
    }).then(function success() {
      return true;
    }, function error(response) {
      console.log('error', response);
    });
  };

  // uses a specific board's id and deletes it from the database
  var deleteBoard = function(id) {
    console.log(id);
    return $http({
      method: 'POST',
      url: 'api/board/delete',
      data: id
    }).then(function success() {
      console.log('board deleted...in dataFactory');
    }, function error(response) {
      console.log('error', response);
    });
  };

  // uses a user's email and verifies if they exist in the database
  var verifyMember = function(email, callback) {
    console.log('verify member factory func firing...');
    $http({
      method: 'POST',
      url: 'api/profile/verify',
      data: email
    }).then(function success(user) {
      if (user.data.length === 0) {
        return callback(false);
      }
      return callback(true);
    }, function error(response) {
      console.log('error', response);
    });
  };

  // uses user's email to fetch user info from database
  var getMember = function(email, callback) {
    return $http({
      method: 'POST',
      url: 'api/profile/verify',
      data: email
    }).then(function success(user) {
      return user.data[0];
    }, function error(response) {
      console.log('error', response);
    });
  };

  // takes an email and sends an invitation to that user to a specific board
  var sendInvite = function(email) {
    console.log('sendInvite factory func firing...');
    return $http({
      method: 'POST',
      url: 'api/board/invite',
      data: email
    }).then(function success() {
      console.log('invite in factory sent');
    }, function error(response) {
      console.log('error', response);
    });
  };

  return {
    loadBoard: loadBoard,
    updateBoard: updateBoard,
    createBoard: createBoard,
    deleteBoard: deleteBoard,
    verifyMember: verifyMember,
    getMember: getMember,
    sendInvite: sendInvite,
    getMembers: getMembers
  };
})

.factory('Socket', function($rootScope) {
  // connects to a socket instance
  var socket = io.connect();

  // checks if a change has occurred and uses socket to apply the changes to the $rootScope
  var on = function(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply(socket, args);
      });
    });
  };

  // sends updated information to all users that are connected through socket
  var emit = function(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    });
  };

  return {
    on: on,
    emit: emit
  };
});
