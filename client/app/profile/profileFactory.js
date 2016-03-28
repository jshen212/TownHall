TownHall.factory('profileFactory', function($http) {

  // uses a user object to fetch all boards that the user is part of
  var getBoards = function(user) {
    return $http({
      method: 'POST',
      url: 'api/board/profileView',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  // uses a user object to fetch all invitations that the user is part of
  var getInvites = function(user) {
    return $http({
      method: 'POST',
      url: 'api/board/invitations',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  // uses a user object to fetch a specific user's name
  var getUserName = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/username',
      data: user
    }).then(function(res) {
      return res.data[0];
    });
  };

  // uses a user object to fetch a user's profile and updates it with the new data
  var updateProfile = function(user) {
    return $http({
      method: 'POST',
      url: 'api/profile/update',
      data: user
    }).then(function(res) {
      return res.data;
    });
  };

  // fetches a specific invite and updates the response 
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
    updateProfile: updateProfile,
    getUserName: getUserName
  };
});
