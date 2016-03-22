TownHall.controller('createBoardModalCtrl', function($scope, $state, dataFactory, loadBoard, $mdDialog) {

  $scope.newBoardName = '';

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
      loadBoard(formattedBoard);
      $mdDialog.hide();
    });
  };

});
