TownHall.controller('dashboardCtrl', function($scope, $window, $state, Auth) {
  $scope.goProfile = function() {
    $state.go('profile');
  };

  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };
});
