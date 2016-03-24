TownHall.controller('dashboardCtrl', function($scope, $window, $state, Auth, $mdDialog, dataFactory) {
  $scope.goProfile = function() {
    $state.go('profile');
  };

  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  $scope.openCreateBoardModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.createAndLoadBoard},
      templateUrl: 'app/profile/createBoardModal.html',
      controller: 'createBoardModalCtrl'
    });
  };

  $scope.createAndLoadBoard = function(board) {
    var boardID = board.board_id;
    sessionStorage.setItem('boardID', boardID);
    dataFactory.loadBoard(board, function(fetchedData) {
      $state.go('dashboard', {obj: fetchedData});
    });
  };

});
