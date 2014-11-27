// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'achouBarreiro' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('achouBarreiro', ['ionic', 'achouBarreiro.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html',
      controller: 'SearchCtrl'
    })

    .state('establishment', {
      url: '/establishment/:establishmentId',
      templateUrl: 'templates/establishment.html',
      controller: 'EstablishmentCtrl'
    })

  $urlRouterProvider.otherwise('/search')
}])