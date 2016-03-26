TownHall.factory('dataFactory', function($http) {

  var loadBoard = function(board, callback) {
    console.log('loadBoard firing');
    $http({
      method: 'POST',
      url: 'api/board/board',
      data: board
    }).then(function success(data) {
      var board = data.data[0];
      console.log('BOARDBOARDBOARDBOARD:', data.data[0]);
      callback(board);
    }, function error(response) {
      console.log('error', response);
    });
  };

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

  var deleteBoard = function(id) {
    console.log(id);
    return $http({
      method: 'POST',
      url: 'api/board/delete',
      data: id
    }).then(function success() {
      console.log('board deleted...in dataFactory');
      // response.send(200);
    }, function error(response) {
      console.log('error', response);
    });
  };

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
      // console.log(user);
    }, function error(response) {
      console.log('error', response);
    });
  };

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
    sendInvite: sendInvite
  };

})
.factory('Socket', function($rootScope) {

  var socket = io.connect();

  var on = function(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply(socket, args);
      });
    });
  };

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
