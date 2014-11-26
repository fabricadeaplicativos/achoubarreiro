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

.controller('EstablishmentCtrl', ['$scope', '$stateParams', 'Establishments', function ($scope, $stateParams, Establishments) {

	Establishments.get({ id: parseInt($stateParams.establishmentId) })
		.then(function(results){
			console.log("oi");
			console.log(results);

			$scope.establishment = results[0];
			
		});

	console.log($stateParams);

}]);