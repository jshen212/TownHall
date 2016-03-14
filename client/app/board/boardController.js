TownHall.controller('boardCtrl', function($scope, $window, $mdDialog, $state) {

  $scope.lists = [
    [{
    createdBy: 'Richard',
    body: 'card 1'
  }, {
    createdBy: 'Daniel',
    body: 'card5'
  }],
    [{
      createdBy: 'Jeff',
      body: 'card2'
    }
    ]
  ];

  $scope.addList = function() {
    $scope.lists.push([]);
  };

  $scope.addCard = function(list) {
    list.push({createdBy: 'DK',
      body: 'card4'});
  };

  $scope.editCard = function(card) {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {card: card},
      templateUrl: 'app/board/cardModal.html',
      controller: 'cardModalCtrl'

    });

  };





});
