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

  var inviteResponse = function(inviteData) {
    return $http({
      method: 'POST',
      url: 'api/board/updateInvite',
      data: inviteData
    }).then(function(res) {
      console.log(res.data);
      return res.data;
    });
  };

  return {
    inviteResponse: inviteResponse,
    getBoards: getBoards,
    getInvites: getInvites
  };
});
