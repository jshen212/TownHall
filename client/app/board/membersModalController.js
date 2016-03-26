TownHall.controller('membersModalCtrl', function($scope, boardID, createdBy, User, profileFactory, boardFactory) {
  $scope.createdBy = '';
  $scope.joinedMembers = [];
  $scope.pendingMembers = [];

  $scope.getUser = function(id, callback) {
    profileFactory.getUserName(id).then(function(user) {
      callback(user);
    });
  };

  $scope.getMembers = function(id, callback) {
    boardFactory.getMembers(id).then(function(members) {
      callback(members);
    });

  };

  $scope.loadMembers = function() {
    var creator = {
      id: createdBy
    };
    $scope.getUser(creator, function(user) {
      $scope.createdBy = user;
    });
    $scope.getMembers(boardID, function(members) {
      console.log(members);

    })



  };

});
