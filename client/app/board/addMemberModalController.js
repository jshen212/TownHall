TownHall.controller('addMemberModalCtrl', function($scope, $http, dataFactory, $mdDialog) {
  $scope.userExists = true;
  $scope.boardMembers = [];
  $scope.inviteMember = '';

  $scope.addInvite = function() {
    var email = {
      email: $scope.inviteMember
    };
    dataFactory.verifyMember(email, function(boolean) {
      if (boolean) {
        $scope.boardMembers.push(email);
        $scope.inviteMember = '';
        $scope.userExists = true;
        console.log('invite sent');
        console.log($scope.boardMembers);
      }
      else {
        $scope.userExists = false;
        // $scope.inviteMember = '';
        console.log('user does not exist');
      }
    });
  };

  $scope.unInvite = function(index) {
    $scope.boardMembers.splice(index, 1);
  };

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
