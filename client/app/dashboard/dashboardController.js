TownHall.controller('dashboardCtrl', function($scope, $window, $state, Auth, $mdDialog, dataFactory) {

  // directs user to profile page
  $scope.goProfile = function() {
    $state.go('profile');
  };

  // removes the current user's info from session storage and changes user to unauthenticated
  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  // opens a modal to invite members to the board
  $scope.openInviteMemberModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.createAndLoadBoard},
      templateUrl: 'app/board/addMemberModal.html',
      controller: 'addMemberModalCtrl'
    });
  };

  // opens a modal to create a new board
  $scope.openCreateBoardModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.createAndLoadBoard},
      templateUrl: 'app/profile/createBoardModal.html',
      controller: 'createBoardModalCtrl'
    });
  };

  // uses a board's id to fetch and load the board
  $scope.createAndLoadBoard = function(board) {
    var boardID = board.board_id;
    sessionStorage.setItem('boardID', boardID);
    dataFactory.loadBoard(board, function(fetchedData) {
      // directs a user to the dashboard page with the fetched board data
      $state.go('dashboard', {obj: fetchedData});
    });
  };
});
