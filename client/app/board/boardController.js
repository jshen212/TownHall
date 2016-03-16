TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state) {

  $scope.lists = [
    {title: 'LIST ONE', cards: [{createdBy: 'jeff', body: 'card 1'}, {createdBy: 'richard', body: 'card 2'}]},
    {title: 'LIST TWO', cards: [{createdBy: 'daniel', body: 'card 3'}, {createdBy: 'DK', body: 'card 4'}]}
  ];

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

  $scope.listConfig = {
    animation: 150
  };

  $scope.listConfig2 = {
    group: 'asdf',
    animation: 150
  };

});
