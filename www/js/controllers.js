angular.module('achouBarreiro.controllers', ['achouBarreiro.services'])

.controller('SearchCtrl', ['$scope', 'Establishments', function ($scope, Establishments) {


	$scope.establishments;

	Establishments.get().success(function (res) {
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
			label: 'res',
			query: 'restaurantes',
			iconClass: 'ion-fork'
		},
		{
			label: 'bares',
			query: 'bares',
			iconClass: 'ion-beer'
		},
		{
			label: 'livrarias',
			query: 'livrarias',
			iconClass: 'ion-android-book'
		},
		{
			label: 'docerias',
			query: ['doces', 'docerias', 'sobremesas'],
			iconClass: 'ion-icecream'
		},
	];

}]);