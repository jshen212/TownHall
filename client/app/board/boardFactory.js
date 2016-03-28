TownHall.factory('boardFactory', function($http) {

  // gets the members of a specific board by using the boardID
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

  return {
    getMembers: getMembers
  };


});
