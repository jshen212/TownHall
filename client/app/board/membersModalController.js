TownHall.controller('membersModalCtrl', function($scope, boardID, createdBy, joinedMembers, pendingMembers, User, dataFactory, profileFactory) {
  $scope.createdBy = '';
  $scope.joinedMembers = [];
  $scope.pendingMembers = [];
  $scope.inviteMember = '';
  $scope.userExists = true;
  $scope.inviteError = '';

  $scope.getUser = function(id, callback) {
    profileFactory.getUserName(id).then(function(user) {
      callback(user);
    });
  };

  $scope.addInvite = function() {
    var info = {
      email: $scope.inviteMember,
      board_id: boardID
    };
    dataFactory.verifyMember(info, function(verified) {
      if (verified) {
        dataFactory.getMember(info).then(function(data) {
          if ($scope.joinedMembers.filter(function(member) {
            return member.email === data.email;
          }).length || info.email === $scope.createdBy.email) {
            $scope.inviteError = '** ' + data.name + ' (' + data.email + ') ' + 'is already a member of this board **';
            $scope.userExists = false;
          } else if ($scope.pendingMembers.filter(function(member) {
            return member.email === data.email;
          }).length) {
            $scope.inviteError = '** ' + data.name + ' (' + data.email + ') ' + 'has already been invited **';
            $scope.userExists = false;
          } else {
            dataFactory.sendInvite(info).then(function() {
              pendingMembers.push({
                user_id: data.id,
                response: 0
              });
              $scope.pendingMembers.push({
                email: data.email,
                image: data.image,
                name: data.name
              });
            });
          }
        });
      } else {
        $scope.inviteError = '** ' + $scope.inviteMember + ' is not a valid user **';
        $scope.userExists = false;
      }
    });
  };

  $scope.loadMembers = function() {
    var creator = {
      user_id: createdBy
    };
    $scope.getUser(creator, function(user) {
      $scope.createdBy = user;
    });
    joinedMembers.forEach(function(member) {
      $scope.getUser(member, function(user) {
        $scope.joinedMembers.push(user);
      });
    });
    pendingMembers.forEach(function(member) {
      $scope.getUser(member, function(user) {
        $scope.pendingMembers.push(user);
      });
    });
  };

  $scope.$watch('inviteMember', function() {
    $scope.userExists = true;
  });

});
