(function () {
    'use strict';

    var RestaurantsController = function ($window, $scope, restaurantsService, geoLocationService, appSettings) {
        var location = null;

        function init() {
            $scope.restaurant = {name: '', image_url: 'images/lunch.jpeg'};
            $scope.appSettings = appSettings;

            $scope.loadingLocation = true;
            geoLocationService.getLocation().then(function (response) {
                location = response;
                $scope.loadingLocation = false;
            }, function (error) {
                $scope.loadingLocation = false;
                if(error.code === error.TIMEOUT){
                    $window.alert(error.message);
                }
            }).then(function () {
                $scope.loadingRestaurants = true;
                restaurantsService.getRandomRestaurant(location).then(function () {
                    $scope.loadingRestaurants = false;
                });
            });
        }

        init();

        $scope.setRandomRestaurant = function () {
            restaurantsService.getRandomRestaurant(location).then(function (restaurant) {
                $scope.restaurant = restaurant;
            });
        };
    };

    RestaurantsController.$inject = ['$window', '$scope', 'restaurantsService', 'geoLocationService', 'appSettings'];

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

