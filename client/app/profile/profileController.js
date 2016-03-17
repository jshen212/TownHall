TownHall.controller('profileCtrl', function($scope, $state, profileFactory) {

  $scope.boards = [{board_id: 1, boardName: 'board1'}];

  $scope.loadBoard = function(board) {
    profileFactory.loadBoard(board, function(fetchedData) {
      $state.go('dashboard', {obj: fetchedData});
    });
  };
});
