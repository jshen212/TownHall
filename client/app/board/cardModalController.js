TownHall.controller('cardModalCtrl', function($scope, $mdDialog, card) {
  console.log(card.body);

  $scope.body = card.body;


});
