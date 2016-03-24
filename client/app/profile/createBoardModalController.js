TownHall.controller('createBoardModalCtrl', function($scope, $state, dataFactory, loadBoard, $mdDialog, Chat) {

  $scope.newBoardName = '';
  $scope.boardMembers = [];
  $scope.inviteMember = '';

  $scope.createBoard = function() {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var board = {
      boardname: $scope.newBoardName,
      id: user.id
    };
    dataFactory.createBoard(board, function(boardData) {
      var formattedBoard = {
        board_id: boardData.id,
        boardName: boardData.board_title
      };
      $scope.sendInvites($scope.boardMembers, boardData.id, function() {
        Chat.createChat(boardData.id);
      });
      loadBoard(formattedBoard);
      $mdDialog.hide();
    });
  };

  $scope.addInvite = function() {
    var email = {
      email: $scope.inviteMember
    };
    dataFactory.verifyMember(email, function(boolean) {
      if (boolean) {
        $scope.boardMembers.push(email);
        $scope.inviteMember = '';
        console.log('invite sent');
        console.log($scope.boardMembers);
      }
      else {
       console.log('user does not exist');
     }
    });
  };

  $scope.sendInvites = function(members, boardID, callback) {

    members.forEach(function(member) {
      var data = {
        email: member.email,
        board_id: boardID
      };
      dataFactory.sendInvite(data);
    });
    callback();
  };

});
