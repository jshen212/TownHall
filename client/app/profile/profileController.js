TownHall.controller('profileCtrl', function($scope, Auth, $state, profileFactory) {

  $scope.boards = [{board_id: 1, boardName: 'board1'}];
  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };
  $scope.loadBoard = function(board) {
    profileFactory.loadBoard(board, function(fetchedData) {
      $state.go('dashboard', {obj: fetchedData});
    });
  };
});
