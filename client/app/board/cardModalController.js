TownHall.controller('cardModalCtrl', function($scope, $window, $state, $mdDialog, card) {

  $scope.card = card;
  $scope.comment = "";

  $scope.addComment = function(comment) {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    if(user) {
      card.comments.push({attachments: "", createdBy: user, text: comment});
      $scope.comment = "";
    } else {
      var confirm = $mdDialog.confirm()
        .title('Please Sign In')
        .textContent('Something went wrong, you must be signed in to comment')
        .ariaLabel('Sign In')
        .ok('Sign In')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        $state.go('signin');
      });
    }
  };


});
