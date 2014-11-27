function myCustomOnNotificationHandler(res) {
    window.tokenRegister(res.regid);
}

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

    // ***********************************
    // P U S H   N O T I F I C A T I O N

    alert('APP MODULE!!!');

    // Make http available globaly
    window.tokenRegister = function(token) {

      $http.get("http://achoubarreiro.goldarkapi.com/push/devices?token=" + token, {
          headers: {
              "Accept": "application/json",
              "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
              "Content-Type": "application/json;charset=utf-8"
          }
        })

        .success(function(data, status, headers, config) {
          alert('Seu token já está registrado!!!: ' + JSON.stringify(data));
        })

        .error(function(data, status, headers, config) {
            $http.post("http://achoubarreiro.goldarkapi.com/push/devices", {
              "token": token,
              "platform": "android"
            },
            {
              headers: {
                  "Accept": "application/json",
                  "X-Api-Token": "4WZ1sleJLR1krSXzx5JmHAgF4h52o2/3jMfoSEjEwnBbmPNg6zbTpOdDm5dJmoaQ/BE2IR7eLrqsDa8fW+ZOuA==",
                  "Content-Type": "application/json;charset=utf-8"
              }
            })

            .success(function(data, status, headers, config) {
                alert('Token registrado com sucesso!');
            })

            .error(function(data, status, headers, config) {
                alert('Houve uma falha na tentativa de registrar seu token: ' + JSON.stringify(data));
            });
        });
    }

    var androidConfig = {
        "senderID":"738722305617",
    };

    androidConfig.ecb = "myCustomOnNotificationHandler";

    // Register for push notification
    $cordovaPush.register(androidConfig).then(function(result) {
        alert('Result: ' + result);
    }, function(err) {
        alert('Error occurred while registering for push notification: ' + err);
    });
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