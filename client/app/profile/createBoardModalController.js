TownHall.controller('createBoardModalCtrl', function($scope, $state, dataFactory, loadBoard, $mdDialog, Chat) {

  $scope.newBoardName = '';
  $scope.boardMembers = [];
  $scope.inviteMember = '';
  $scope.userExists = true;

  // creates a new board
  $scope.createBoard = function() {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var board = {
      boardname: $scope.newBoardName,
      id: user.id
    };
    // takes board data and adds it into the database
    dataFactory.createBoard(board, function(boardData) {
      var formattedBoard = {
        board_id: boardData.id,
        boardName: boardData.board_title
      };

      // sends member invitations after board is created
      $scope.sendInvites($scope.boardMembers, boardData.id, function() {
        // creates a chat specific to the board
        Chat.createChat(boardData.id);
      });
      // loads the newly created board
      loadBoard(formattedBoard);
      $mdDialog.hide();
    });
  };

  // adds a user's email to a board's boardMembers array
  $scope.addInvite = function() {
    var email = {
      email: $scope.inviteMember
    };
    // verifies if a user exists in the database
    dataFactory.verifyMember(email, function(boolean) {
      if (boolean) {
        // if user exists, user's email is pushed in to the board's boardMembers array
        $scope.boardMembers.push(email);
        $scope.inviteMember = '';
        $scope.userExists = true;
      }
      else {
        $scope.userExists = false;
      }
    });
  };

  // removes a user out of the invited list
  $scope.unInvite = function(index) {
    $scope.boardMembers.splice(index, 1);
  };

  // takes an array of members and sends an invite to each member in the array
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
