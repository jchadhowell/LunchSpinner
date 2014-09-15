(function () {
    'use strict';

    var RestaurantsController = function ($window, $scope, restaurantsService, geoLocationService, appSettings) {
        var locationPromise = geoLocationService.getLocation();

        function init() {
            $scope.restaurant = {name: '', image_url: 'images/lunch.jpeg'};
            $scope.appSettings = appSettings;

            $scope.loading = true;
            locationPromise.then(function (location) {
                restaurantsService.getRandomRestaurant(location).then(function(){
                    $scope.loading = false;
                });
            }, function (error) {
                if(error.code === error.TIMEOUT){
                    $window.alert(error.message);
                }
                restaurantsService.getRandomRestaurant().then(function(){
                    $scope.loading = false;
                });
            });
        }

        init();

        $scope.setRandomRestaurant = function () {
            locationPromise.then(function (location) {
                restaurantsService.getRandomRestaurant(location).then(function (restaurant) {
                    $scope.restaurant = restaurant;
                });
            }, function () {
                restaurantsService.getRandomRestaurant().then(function (restaurant) {
                    $scope.restaurant = restaurant;
                });
            });

        };
    };

    RestaurantsController.$inject = ['$window', '$scope', 'restaurantsService', 'geoLocationService', 'appSettings'];

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

