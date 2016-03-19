var TownHall = angular.module('TownHall', ['firebase', 'ui.router', 'ngMaterial', 'xeditable', 'ng-sortable', 'angularInlineEdit'])
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
    views: {
      '': {
        templateUrl: 'app/dashboard/dashboard.html'
      },
      'board@dashboard': {
        templateUrl: 'app/board/board.html',
        controller: 'boardCtrl'
      },
      'chat@dashboard': {
        templateUrl: 'app/chat/chat.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'app/profile/profile.html',
    controller: 'profileCtrl',
    authenticate: false
  });

  $urlRouterProvider.otherwise('/');
});
