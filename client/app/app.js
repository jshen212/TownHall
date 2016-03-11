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
    authenticate: false
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'app/auth/signin.html',
    authenticate: false
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    authenticate: true
  });

  $urlRouterProvider.otherwise('/');
});
