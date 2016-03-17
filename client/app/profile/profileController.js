TownHall.controller('profileCtrl', function($scope, profileFactory) {

  $scope.boards = [{board_id: 1, boardName: 'board1'}];

  $scope.loadBoard = function(board){
    profileFactory.loadBoard(board, function(){
      console.log('change state');
    });
  };
});
