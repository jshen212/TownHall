TownHall.factory('profileFactory', function($http) {

  var loadBoard = function(board, callback) {
    console.log('loadBoard firing');
    $http({
      method: 'POST',
      url: 'api/board/board',
      data: board
    }).then(function success(data) {
      console.log('++line10 profileFactory', data);
      callback(data);
    });
  };

  return {
    loadBoard: loadBoard
  };

});
