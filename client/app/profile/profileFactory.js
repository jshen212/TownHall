TownHall.factory('profileFactory', function($http) {

  var loadBoard = function(board, callback) {
    console.log('loadBoard firing');
    $http({
      method: 'GET',
      url: '/board',
      data: board
    }).then(function success(data) {
      console.log(data);
      callback(data);
    });
  };

  return {
    loadBoard: loadBoard
  };

});
