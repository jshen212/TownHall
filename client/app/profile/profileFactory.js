TownHall.factory('profileFactory', function($http){
  var getInvites = function(user){
    return $http({
      method: 'POST',
      url: 'api/board/invitations',
      data: user
    }).then(function(res){
      return res.data;
    });
  };
  return {
    getInvites: getInvites
  };
});
