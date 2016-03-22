TownHall.factory('profileFactory', function($http) {

  var getBoards = function(user) {
    return $http({
      method: 'POST',
      url: 'api/board/profileView',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  var getInvites = function(user) {
    return $http({
      method: 'POST',
      url: 'api/board/invitations',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    getBoards: getBoards,
    getInvites: getInvites
  };
});
