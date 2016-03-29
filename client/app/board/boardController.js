TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state, $timeout, $stateParams, User, dataFactory, Socket) {
  $scope.created = false;
  $scope.boardID = '';
  $scope.boardTitle = '';
  $scope.createdBy = '';
  $scope.joinedMembers = [];
  $scope.pendingMembers = [];
  $scope.boardLists = [];

  // creates a placeholder in the list to show where card will be dropped
  $scope.dragoverCallback = function(event, index, external, type) {
    return index < 10;
  };

  // allows only cards to be dragged with each other and lists to be dragged with each other
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

  // gets members that are part of a board, using the board id
  // runs a callback on the returns members
  $scope.getMembers = function(id, callback) {
    dataFactory.getMembers(id).then(function(members) {
      callback(members);
    });
  };

  // edits the members that are part of a board
  $scope.editMembers = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {
        createdBy: $scope.createdBy,
        boardID: $scope.boardID,
        joinedMembers: $scope.joinedMembers,
        pendingMembers: $scope.pendingMembers
      },
      templateUrl: 'app/board/membersModal.html',
      controller: 'membersModalCtrl'
    });
  };

  // adds a new list for tasks in the boardlists
  $scope.addList = function() {
    $scope.boardLists.push({title: '', cards: []});
  };

  // removes a list from the boardlists
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

  // edits the title of a list
  $scope.editTitle = function(val, list) {
    list.title = val;
  };

  // adds a task card to a list
  $scope.addCard = function(val, list) {
    list.cards.push({comments: [], text: val});
  };

  // edits the text in a task card
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

  // deletes a card from the list
  $scope.removeCard = function(list, index) {
    list.cards.splice(index, 1);
  };

  // takes a board and parses out the necessary properties
  $scope.parseBoard = function(board) {
    $scope.boardID = board.id;
    $scope.boardTitle = board.board_title;
    $scope.createdBy = board.board_createdby;
    $scope.boardLists = JSON.parse(board.board_lists);
    var boardobj = {
      boardID: JSON.parse(board.id)
    };
    $scope.getMembers(boardobj, function(members) {
      members.forEach(function(member) {
        // checks which members have a response of 1 and adds to the board's joined members
        if (member.response === 1) {
          $scope.joinedMembers.push(member);
        }

        // checks which members have a response of 0 and adds to the board's pending members
        if (member.response === 0) {
          $scope.pendingMembers.push(member);
        }
      });
    });
  };

  // fetches a specific board from the database based on the board id
  $scope.getBoardFromDB = function() {
    var id = sessionStorage.boardID;
    var board = {board_id: id};
    dataFactory.loadBoard(board, function(fetchedData) {
      $scope.parseBoard(fetchedData);
    });
  };

  // checks if stateParams.obj property exists and if so, parses the board
  // else, if stateParams.obj does not exist, loadBoard will check sessionStorage for a boardID and fetch the board from the database
  // else, if it does not exist, user will be directed to the profile page
  $scope.loadBoard = function() {
    if ($stateParams.obj) {
      var board = $stateParams.obj;
      $scope.parseBoard(board);
    } else if (sessionStorage.boardID) {
      $scope.getBoardFromDB();
    } else {
      $state.go('profile');
    }
  };

  // deletes a board from the database and directs the user to the profile
  $scope.deleteBoard = function() {
    console.log('deleting...');
    var id = {
      board_id: $scope.boardID
    };
    dataFactory.deleteBoard(id);
    $state.go('profile');
  };

  // updates a specific board and uses socket to broadcast the change to all users
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

  // checks if the logged in user is the creator of the board that he is in
  $scope.checkUserCreatedBoard = function() {
    var userInfo = JSON.parse(localStorage.getItem('userInfo'));
    var userId = userInfo.id;

    if(userId === $scope.createdBy) {
      $scope.created = true;
    }
  };

  // on a socket emit event of "board", it will set the boardLists to board.board_lists
  Socket.on('board', function(board) {
    if (board.board_id === $scope.boardID) {
      $scope.boardLists = board.board_lists;
    }
  });

  // watches boardLists for changes and runs updateBoard if something changes
  $scope.$watch('boardLists', function(newValue, oldValue) {
    $scope.updateBoard();
  }, true);

});
