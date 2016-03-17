TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state, $stateParams,
  profileFactory) {

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

    $scope.getBoard = function() {
      $scope.board = $stateParams.obj.board_lists;
      $scope.boardTitle = $stateParams.obj.board_title;
      $scope.createdBy = $stateParams.obj.board_createdby;
      $scope.boardLists = JSON.parse($stateParams.obj.board_lists);
      console.log('++line61 boardCtrl', JSON.parse($scope.board));
    };

  });
