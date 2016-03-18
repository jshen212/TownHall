TownHall.factory('dataFactory', function($http) {

  var loadBoard = function(board, callback) {
    console.log('loadBoard firing');
    $http({
      method: 'POST',
      url: 'api/board/board',
      data: board
    }).then(function success(data) {
      var board = data.data[0];
      console.log(board);
      callback(board);
    }, function error(response) {
      console.log('error', response);
    });
  };

  var updateBoard = function(board) {
    console.log('updateBoard firing');
    $http({
      method: 'POST',
      url: 'api/board/update',
      data: board
    }).then(function success() {
      console.log('board updated');
    }, function error(response) {
      console.log('error', response);
    });

  };

  return {
    loadBoard: loadBoard,
    updateBoard: updateBoard
  };

});
