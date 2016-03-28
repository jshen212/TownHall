TownHall.controller('membersModalCtrl', function($scope, boardID, createdBy, joinedMembers, pendingMembers, User, dataFactory, profileFactory) {
  $scope.createdBy = '';
  $scope.joinedMembers = [];
  $scope.pendingMembers = [];
  $scope.inviteMember = '';
  $scope.userExists = true;
  $scope.inviteError = '';

  // gets a user's information by using their id and runs a callback on the returned data
  $scope.getUser = function(id, callback) {
    profileFactory.getUserName(id).then(function(user) {
      callback(user);
    });
  };

  // adds an invited member to a board
  $scope.addInvite = function() {
    var info = {
      email: $scope.inviteMember,
      board_id: boardID
    };
    // checks if the user is in the database
    dataFactory.verifyMember(info, function(verified) {
      // if so, gets the user's information
      if (verified) {
        dataFactory.getMember(info).then(function(data) {
          if ($scope.joinedMembers.filter(function(member) {
            // checks if the user is already a member of the board
            return member.email === data.email;
          }).length || info.email === $scope.createdBy.email) {
            $scope.inviteError = '** ' + data.name + ' (' + data.email + ') ' + 'is already a member of this board **';
            $scope.userExists = false;
            // checks if the user has already been invited
          } else if ($scope.pendingMembers.filter(function(member) {
            return member.email === data.email;
          }).length) {
            $scope.inviteError = '** ' + data.name + ' (' + data.email + ') ' + 'has already been invited **';
            $scope.userExists = false;
            // if user is not a member and has not been invited, an invite will be sent
          } else {
            dataFactory.sendInvite(info).then(function() {
              // user is added to the pendingMembers array with a response of 0 (pending)
              pendingMembers.push({
                user_id: data.id,
                response: 0
              });
              // user is also pushed into the pendingMembers array on the local scope
              $scope.pendingMembers.push({
                email: data.email,
                image: data.image,
                name: data.name
              });
            });
          }
        });
        // if user does not exist in the database, a message will state it is not a valid user
      } else {
        $scope.inviteError = '** ' + $scope.inviteMember + ' is not a valid user **';
        $scope.userExists = false;
      }
    });
  };

  // loads the members of a specific board and displays the creator, joined members, and pending members
  $scope.loadMembers = function() {
    var creator = {
      user_id: createdBy
    };
    // fetches the board's creator info
    $scope.getUser(creator, function(user) {
      $scope.createdBy = user;
    });
    // fetches the joined members and pushes the users into a joinedMembers array
    joinedMembers.forEach(function(member) {
      $scope.getUser(member, function(user) {
        $scope.joinedMembers.push(user);
      });
    });
    // fetches the pending members and pushes the users into a pendingMembers array
    pendingMembers.forEach(function(member) {
      $scope.getUser(member, function(user) {
        $scope.pendingMembers.push(user);
      });
    });
  };
  // watches for changes in inviteMember and if a change occurs, it updates userExists to true
  $scope.$watch('inviteMember', function() {
    $scope.userExists = true;
  });
});
