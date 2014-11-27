angular.module('achouBarreiro.controllers', ['achouBarreiro.services'])

.controller('SearchCtrl', ['$scope', 'Establishments', function ($scope, Establishments) {


	$scope.establishments;

	Establishments.get().then(function (res) {
		$scope.establishments = res;

		console.log(res);
	});


	$scope.search = {};

	$scope.$watch('search.query', function () {

		var query = $scope.search.query;

		$scope.search.stringifiedQuery = Array.isArray(query) ? query.join(', ') : query;

	});

	$scope.$watch('search.stringifiedQuery', function () {
		$scope.search.query = $scope.search.stringifiedQuery;
	})
	
	$scope.buttons = [
		{
			label: 'restaurantes',
			query: 'restaurante',
			iconClass: 'ion-fork'
		},
		{
			label: 'bares',
			query: 'bar',
			iconClass: 'ion-beer'
		},
		{
			label: 'livrarias',
			query: 'livraria',
			iconClass: 'ion-android-book'
		},
		{
			label: 'docerias',
			query: 'doce',
			iconClass: 'ion-icecream'
		},
	];

}])

.controller('EstablishmentCtrl', ['$scope', '$stateParams', 'Establishments', '$ionicActionSheet', function ($scope, $stateParams, Establishments, $ionicActionSheet, $cordovaGeolocation) {
	
	$scope.i = 0;
	
	$scope.$on('$viewContentLoaded', function() {
		$scope.i++;
		$scope.renderMap();
	});
	
	Establishments.get({ id: $stateParams.establishmentId })
		.then(function(results){
			console.log("oi");
			console.log(results);

			$scope.establishment = results[0];
			$scope.establishment.title = $scope.establishment.title.toLowerCase();
			
			$scope.i++;
			$scope.renderMap();

		});

	console.log($stateParams);

	$scope.menuAction = function(){
		$ionicActionSheet.show({
			buttons : [
			{ text : "ações"},
			{ text : "ligar"}
			],
			buttonClicked : function(index){
				return true;
			}
		});
	};
	
	$scope.renderMap = function() {
		
		if($scope.i < 2)
			return;

		var latLng = new google.maps.LatLng($scope.establishment.location[0], $scope.establishment.location[1]);
        
		var mapOptions = {
			center: latLng,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
        
		var map = new google.maps.Map(document.getElementById("map"),
		            mapOptions);
        
		var marker = new google.maps.Marker({
		      position: latLng,
		      map: map,
		      title: $scope.establishment.title
		});
		
		
		console.log("cordovaGeolocation is undefined?");
		
		if($cordovaGeolocation != undefined){
		
			console.log("No");
			$cordovaGeolocation
			    .getCurrentPosition()
			    .then(function (pos) {
        	
					var request = {
					    origin: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
					    destination: latLng,
					    waypoints: [],
					    optimizeWaypoints: true,
					    travelMode: google.maps.TravelMode.DRIVING
					};
        	    	
					directionsDisplay = new google.maps.DirectionsRenderer();
					var directionsService = new google.maps.DirectionsService();
        	    	
					directionsService.route(request, function(response, status) {
        	    	
						marker.setVisible(false);
						// POG
						response.routes[0].legs[0].end_address = $scope.establishment.title + ' - ' + response.routes[0].legs[0].end_address;
						directionsDisplay.setMap(map);
						directionsDisplay.setDirections(response);
					});
			
			    }, function(error) {
					alert('Unable to get location: ' + error.message);
				});
		}
		else
			console.log("Yes");
	}

}]);



