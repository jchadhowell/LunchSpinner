(function () {
    var restaurantsFactory = function ($http) {

        var restaurants;
        var restaurantsPromise;

        function init() {
            restaurantsPromise = $http.get('/restaurants')
                .success(function (data) {
                restaurants = data;
            })
                .error(function(data, status, headers, config){
                   //handle error
                });
        }

        init();

        var factory = {};

        factory.getRandomRestaurant = function () {
            return restaurantsPromise.then(function (){
                return restaurants[Math.floor(Math.random() * restaurants.length)];
            })



        };

        return factory;
    };

    restaurantsFactory.$inject = ['$http'];

    angular.module('restaurantApp').factory('restaurantsFactory', restaurantsFactory);

    angular.module('restaurantApp').value('appSettings', {
        title: 'LunchSpinner',
        version: '1.0'
    });

}());