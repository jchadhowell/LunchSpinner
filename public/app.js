(function () {
    'use strict';

    angular.module('restaurantApp', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/',
                {
                    controller: 'RestaurantsController',
                    templateUrl: 'restaurants.html'
                })
                .otherwise({ redirectsTo: '/'});
        });

}());

