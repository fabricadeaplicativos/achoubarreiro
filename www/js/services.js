angular.module('achouBarreiro.services', [])

//////////
// libs //
.service('_', ['$window', function ($window) {
	return $window._;
}])
// libs //
//////////

.service('Establishments', ['$http', '$q', '_', function ($http, $q, _) {


	return {
		get: function (search) {

			var defer = $q.defer();

			$http.get('data/estabelecimentos.json')
				.success(function (res) {

					if (search) {

						defer.resolve(_.where(res, search));

					} else {
						defer.resolve(res);
					}

				})
				.error(function (err) {

				});

			return defer.promise;
		},


	}
}])


.service('Geolocation', ['$http', '$q', '_', function ($http, $q, _) {
}]);
