TownHall.controller('addMemberModalCtrl', function($scope, $http, dataFactory, $mdDialog) {
  $scope.userExists = true;
  $scope.boardMembers = [];
  $scope.inviteMember = '';

  // invites member to a board
  $scope.addInvite = function() {
    var email = {
      email: $scope.inviteMember
    };
    // verifies that the email exists
    dataFactory.verifyMember(email, function(boolean) {
      // if email exists, push email into boardMembers array
      if (boolean) {
        $scope.boardMembers.push(email);
        // reset invited member field to empty
        $scope.inviteMember = '';
        $scope.userExists = true;
        console.log('invite sent');
        console.log($scope.boardMembers);
      }
      else {
        $scope.userExists = false;
        console.log('user does not exist');
      }
    });
  };

  // removes a user from the boardMembers array
  $scope.unInvite = function(index) {
    $scope.boardMembers.splice(index, 1);
  };

// creates a new invite and adds the invite to the Invites collection
  $scope.addMembers = function() {
    $scope.boardMembers.forEach(function(member) {
      var data = {
        email: member.email,
        board_id: JSON.parse(sessionStorage.getItem('boardID'))
      };
      dataFactory.sendInvite(data);
      $mdDialog.hide();
    });
  };
});
