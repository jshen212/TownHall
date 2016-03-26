TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state, $timeout, $stateParams, User, dataFactory, Socket) {
  $scope.created = false;
  $scope.boardID = '';
  $scope.boardTitle = '';
  $scope.createdBy = '';
  $scope.boardLists = [];

  $scope.dragoverCallback = function(event, index, external, type) {
    return index < 10;
  };

  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
    if (external) {
      if (allowedType === 'cardType' && !item.text) {
        return false;
      }
      if (allowedType === 'containerType' && !angular.isArray(item)) {
        return false;
      }
    }
    return item;
  };

  $scope.editMembers = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {
        createdBy: $scope.createdBy,
        boardID: $scope.boardID
      },
      templateUrl: 'app/board/membersModal.html',
      controller: 'membersModalCtrl'
    });
  };

  $scope.addList = function() {
    $scope.boardLists.push({title: '', cards: []});
  };

  $scope.removeList = function(ev, index) {
    var confirm = $mdDialog.confirm()
    .title('Remove List')
    .textContent('Are you sure?  You cannot undo.')
    .ariaLabel('Remove List')
    .targetEvent(ev)
    .ok('Delete')
    .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      $scope.boardLists.splice(index, 1);
      $scope.updateBoard();
    });
  };

  $scope.editTitle = function(val, list) {
    list.title = val;
  };

  $scope.addCard = function(val, list) {
    list.cards.push({comments: [{attachments: '', createdBy: 'user information holder', text: 'first comment'}], text: val});
  };

  $scope.editCard = function(card) {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {
        card: card,
        updateBoard: $scope.updateBoard
      },
      templateUrl: 'app/board/cardModal.html',
      controller: 'cardModalCtrl'
    });
  };

  $scope.removeCard = function(list, index) {
    list.cards.splice(index, 1);
  };

  $scope.parseBoard = function(board) {
    console.log('boardd in parseBoard', board);
    $scope.boardID = board.id;
    $scope.boardTitle = board.board_title;
    $scope.createdBy = board.board_createdby;
    $scope.boardLists = JSON.parse(board.board_lists);
  };

  $scope.getBoardFromDB = function() {
    if (!sessionStorage.boardID) {
      $state.go('profile');
    }
    var id = sessionStorage.boardID;
    var board = {board_id: id};
    dataFactory.loadBoard(board, function(fetchedData) {
      $scope.parseBoard(fetchedData);
    });
  };

  $scope.loadBoard = function() {
    if ($stateParams.obj) {
      var board = $stateParams.obj;
      $scope.parseBoard(board);
    } else {
      $scope.getBoardFromDB();
    }
  };

  $scope.deleteBoard = function() {
    console.log('deleting...');
    var id = {
      board_id: $scope.boardID
    };
    dataFactory.deleteBoard(id);
    $state.go('profile');
  };

  $scope.updateBoard = function() {
    var board = {
      board_id: $scope.boardID,
      board_title: $scope.boardTitle,
      board_lists: $scope.boardLists
    };
    dataFactory.updateBoard(board).then(function() {
      Socket.emit('boardChange', board);
    });
  };

  $scope.checkUserCreatedBoard = function() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.id;

    if(userId === $scope.createdBy) {
      $scope.created = true;
    }
  };

  Socket.on('board', function(board) {
    if (board.board_id === $scope.boardID) {
      $scope.boardLists = board.board_lists;
    }
  });

  $scope.$watch('boardLists', function(newValue, oldValue) {
    $scope.updateBoard();
  }, true);

});
