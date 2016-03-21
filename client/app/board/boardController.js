TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state, $stateParams, User, dataFactory) {

  $scope.board = [ //board
   {listTitle: 'list 1', cards: [{text: '1card1 this is what a longer card looks like, but i dont really care'}, {text: '1caard2'}]}, //list
   {listTitle: 'list 2', cards: [{text: '1card1 this is what a longer card looks like, but i dont really care'}, {text: '1caard2'}]},
   {listTitle: 'list 3', cards: [{text: '1card1 this is what a longer card looks like, but i dont really care'}, {text: '1caard2'}]}
  ];

  $scope.dragoverCallback = function(event, index, external, type) {
   // $scope.logListEvent('dragged over', event, index, external, type);
   // Disallow dropping in the third row. Could also be done with dnd-disable-if.
   return index < 10;
  };

  $scope.dropCallback = function(event, index, item, external, type, allowedType) {
   // $scope.logListEvent('dropped at', event, index, external, type);
   if (external) {
     if (allowedType === 'cardType' && !item.text) return false;
     if (allowedType === 'containerType' && !angular.isArray(item)) return false;
   }
   console.log($scope.board)

   return item;
  };

  $scope.addList = function() {
   $scope.board[0].push([{text: 'card'}]);
   console.log('new list added');
  };

  $scope.addCard = function(index) {
   $scope.board[0][index].push({text: 'card'});
   console.log('new list added');
  };




  // $scope.boardID = '';
  // $scope.boardTitle = '';
  // $scope.createdBy = '';
  // $scope.boardLists = [];

  // $scope.cardConfig = {
  //   group: 'cards',
  //   filter: '.unsortable',
  //   animation: 150,
  //   onUpdate: function() {
  //     $scope.updateBoard();
  //   },
  //   onAdd: function() {
  //     $scope.updateBoard();
  //   }
  // };

  // $scope.addList = function() {
  //   $scope.boardLists.push({title: '', cards: []});
  //   $scope.updateBoard();
  //   console.log(User.userInfo);
  // };

  // $scope.addCard = function(val, list) {
  //   list.cards.push({comments: [{attachments: '', createdBy: 'user information holder', text: 'first comment'}],
  //   text: val});
  //   $scope.updateBoard();
  // };

  // $scope.editTitle = function(val, list) {
  //   list.title = val;
  //   $scope.updateBoard();

  // };

  // $scope.editCard = function(card) {
  //   $mdDialog.show({
  //     clickOutsideToClose: true,
  //     locals: {
  //       card: card,
  //       updateBoard: $scope.updateBoard
  //     },
  //     templateUrl: 'app/board/cardModal.html',
  //     controller: 'cardModalCtrl'
  //   });
  // };

  // $scope.removeCard = function(list, index) {
  //   list.cards.splice(index, 1);
  //   $scope.updateBoard();
  // };

  // $scope.removeList = function(ev, index) {
  //   var confirm = $mdDialog.confirm()
  //   .title('Remove List')
  //   .textContent('Are you sure?  You cannot undo.')
  //   .ariaLabel('Remove List')
  //   .targetEvent(ev)
  //   .ok('Delete')
  //   .cancel('Cancel');
  //   $mdDialog.show(confirm).then(function() {
  //     $scope.boardLists.splice(index, 1);
  //     $scope.updateBoard();
  //   });
  // };

  // $scope.parseBoard = function(board) {
  //   $scope.boardID = board.id;
  //   $scope.boardTitle = board.board_title;
  //   $scope.createdBy = board.board_createdby;
  //   $scope.boardLists = JSON.parse(board.board_lists);
  // };

  // $scope.getBoardFromDB = function() {
  //   if(!sessionStorage.boardID){
  //     $state.go('profile');
  //   }
  //   var id = sessionStorage.boardID;
  //   var board = {board_id: id};
  //   dataFactory.loadBoard(board, function(fetchedData) {
  //     $scope.parseBoard(fetchedData);
  //   });
  // };

  // $scope.loadBoard = function(){
  //   if($stateParams.obj){
  //     var board = $stateParams.obj;
  //     $scope.parseBoard(board);
  //   } else {
  //     $scope.getBoardFromDB();
  //   }
  // };

  // $scope.updateBoard = function() {
  //   var board = {
  //     board_id: $scope.boardID,
  //     board_title: $scope.boardTitle,
  //     board_lists: $scope.boardLists
  //   };
  //   dataFactory.updateBoard(board);
  // };
});
