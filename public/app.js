(function(){
    var app = angular.module('restaurantApp', ['ngRoute']);

    app.config(function ($routeProvider)  {
             $routeProvider
                 .when('/',
                 {
                     controller: 'RestaurantsController',
                     templateUrl: 'restaurants.html'
                 })
                 .otherwise({ redirectsTo: '/'});
    });

}());

