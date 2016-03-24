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

  var getUserName = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/username',
      data: user
    }).then(function(res) {
      return res.data[0];
    });
  };

  var inviteResponse = function(inviteData) {
    return $http({
      method: 'POST',
      url: 'api/board/updateInvite',
      data: inviteData
    }).then(function(res) {
      return res.data;
    });
  };

  return {
    inviteResponse: inviteResponse,
    getBoards: getBoards,
    getInvites: getInvites,
    getUserName: getUserName
  };
});
