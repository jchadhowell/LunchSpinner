(function () {
    'use strict';

    var RestaurantsController = function ($window, $scope, restaurantsService, geoLocationService, appSettings) {
        var location = null;
        var allRestaurants = null;
        var restaurants = null;
        
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
                restaurantsService.getRestaurants(location).then(function (restaurantsFromService) {
                    allRestaurants = restaurantsFromService;
                    restaurants = allRestaurants.slice(0);
                    $scope.loadingRestaurants = false;
                });
            });
        }

        init();

        $scope.setRandomRestaurant = function () {
            if(!restaurants.length){
                restaurants = allRestaurants.slice(0);
            }
            var index = Math.floor(Math.random() * restaurants.length);
            $scope.restaurant = restaurants[index];
            restaurants.splice(index, 1);
        };
    };

    RestaurantsController.$inject = ['$window', '$scope', 'restaurantsService', 'geoLocationService', 'appSettings'];

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

