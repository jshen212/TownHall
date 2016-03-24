TownHall.controller('profileCtrl', function($scope, Auth, $state, dataFactory, profileFactory, $mdDialog) {
  // $scope.boards = [{board_id: 1, boardName: 'board1'}, {board_id: 3, boardName: 'board3'}, {board_id: 7, boardName: 'board7'}];
  $scope.boards = [];

  $scope.invitations = [];

  $scope.refreshProfile = function() {
    window.location.reload();
  };

  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  $scope.loadBoard = function(board) {
    var boardID = board.board_id;
    sessionStorage.setItem('boardID', boardID);
    dataFactory.loadBoard(board, function(fetchedData) {
      $state.go('dashboard', {obj: fetchedData});
    });
  };

  $scope.openCreateBoardModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.loadBoard},
      templateUrl: 'app/profile/createBoardModal.html',
      controller: 'createBoardModalCtrl'
    });
  };

  $scope.getInvites = function(user) {
    profileFactory.getInvites(user).then(function(invitations) {
      invitations.forEach(function(invitation) {
        var user = {
          id: invitation.board_createdby
        };
        profileFactory.getUserName(user).then(function(fetchedData) {
          invitation.board_createdby = fetchedData;
        });
      });
      $scope.invitations = invitations;
    });
  };

  $scope.getBoards = function(user) {
    profileFactory.getBoards(user).then(function(boards) {
      var formattedBoards = boards.map(function(board) {
        return {
          board_id: board.id,
          boardName: board.board_title
        };
      });
      $scope.boards = formattedBoards;
    });
  };

  $scope.loadProfile = function() {
    var userID = localStorage.getItem('userInfo');
    var user = JSON.parse(userID);

    $scope.getInvites(user);
    $scope.getBoards(user);
  };

  $scope.respondToInvite = function(boardID, index, response) {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var userID = user.id;
    $scope.invitations.splice(index, 1);
    profileFactory.inviteResponse({
      userId: userID,
      boardId: boardID,
      answer: response
    }).then(function() {
      $scope.getBoards(user);
    });
  };

});
