var TownHall = angular.module('TownHall', ['ui.router', 'ngMaterial'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: 'app/landing/landing.html',
    controller: 'landingCtrl',
    authenticate: false
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'app/auth/signup.html',
    controller: 'authCtrl',
    authenticate: false
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'app/auth/signin.html',
    controller: 'authCtrl',
    authenticate: false
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/board/board.html',
    controller: 'dashboardCtrl',
    authenticate: false
  });

  $urlRouterProvider.otherwise('/');
});
