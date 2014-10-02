(function () {
    'use strict';

    var restaurantsServiceFactory = function ($http, $log) {

        function getRestaurants(location) {
            return $http({
                method: 'GET',
                url: '/restaurants',
                params: location,
                cache: true
            })
                .then(function (resp) {
                    return resp.data;
                }, function (resp) {
                    $log.log('data.error', resp);
                });

        }

        return {
            getRestaurants: getRestaurants
        };

    };

    restaurantsServiceFactory.$inject = ['$http', '$log'];

    var geoLocationServiceFactory = function ($q) {
        return {
            getLocation: function () {
                var deferred = $q.defer();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        deferred.resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    }, function (error) {
                        deferred.reject(error);
                    }, { timeout: 10000 });
                }
                return deferred.promise;
            }
        };
    };
    geoLocationServiceFactory.$inject = ['$q'];

    angular.module('restaurantApp')
        .factory('restaurantsService', restaurantsServiceFactory)
        .factory('geoLocationService', geoLocationServiceFactory)
        .value('appSettings', {
            title: 'LunchSpinner',
            version: '1.0'
        });

}());