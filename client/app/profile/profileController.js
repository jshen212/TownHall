TownHall.controller('profileCtrl', function($scope, Auth, $state, dataFactory, $mdDialog) {
  $scope.boards = [{board_id: 1, boardName: 'board1'}, {board_id: 3, boardName: 'board3'}, {board_id: 7, boardName: 'board7'}];

  $scope.loadProfile = function() {
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

});
