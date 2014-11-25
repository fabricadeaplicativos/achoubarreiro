angular.module('achouBarreiro.services', [])

.service('Establishments', ['$http', function ($http) {


	return {
		get: function () {

			return $http.get('data/estabelecimentos.json')
		},


	}
}]);
