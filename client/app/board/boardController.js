TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state, $stateParams, dataFactory) {

    $scope.board = {};
    $scope.boardID = '';
    $scope.boardTitle = '';
    $scope.createdBy = '';
    $scope.boardLists = [];

    $scope.addList = function() {
      $scope.lists.push({title: 'LIST NEW', cards: []});
    };

    $scope.addCard = function(list) {
      list.cards.push({createdBy: 'DK',
      body: 'card4'});
    };

    $scope.editTitle = function(list) {
      $mdDialog.show({
        clickOutsideToClose: true,
        locals: {list: list},
        templateUrl: 'app/board/titleModal.html',
        controller: 'titleModalCtrl'
      });
    };

    $scope.editCard = function(card) {
      $mdDialog.show({
        clickOutsideToClose: true,
        locals: {card: card},
        templateUrl: 'app/board/cardModal.html',
        controller: 'cardModalCtrl'
      });
    };

    $scope.removeCard = function(list, index) {
      console.log(index);
      list.cards.splice(index, 1);
    };

    $scope.removeList = function(lists, index) {
      lists.splice(index, 1);

      console.log(lists);
    };

    $scope.listConfig = {
      animation: 150
    };

    $scope.cardConfig = {
      group: 'cards',
      filter: '.unsortable',
      animation: 150
    };

    $scope.parseBoard = function(board) {
      $scope.board = board;
      $scope.boardID = board.id;
      $scope.boardTitle = board.board_title;
      $scope.createdBy = board.board_createdby;
      $scope.boardLists = JSON.parse(board.board_lists);
    };

    $scope.getBoardFromDB = function() {
      var id = sessionStorage["tempStorage"];
      var board = {board_id: id};
      dataFactory.loadBoard(board, function(fetchedData) {
        $scope.parseBoard(fetchedData);
      });
    };

    $scope.loadBoard = function(){
      if($stateParams.obj){
        var board = $stateParams.obj;
        $scope.parseBoard(board);
      } else {
        $scope.getBoardFromDB();
      }
    }

  });
