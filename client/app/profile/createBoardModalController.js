TownHall.controller('createBoardModalCtrl', function($scope, $state, dataFactory) {

  $scope.newBoardName = '';

  $scope.createBoard = function() {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var board = {
      boardname: $scope.newBoardName,
      id: user.id
    };
    dataFactory.createBoard(board, function() {
      console.log('board successfully added to database. we should redirect to the board now')
      // $state.go('dashboard');
    });
  };

});
