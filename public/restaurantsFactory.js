(function(){
    var restaurantsFactory = function() {
        var restaurants = [
            {name: 'Whole Foods', type: 'Eclectic'},
            {name: 'Newks', type: 'Sandwich'},
            {name: 'Chuys', type: 'Tex-mex'},
            {name: 'Masala Wok', type: 'Indian'},
            {name: 'Fire Bowl', type: 'Asian'},
            {name: 'Panera', type: 'sandwich'},
            {name: 'Noodles', type: 'pasta'}
        ];

        var factory = {};

        factory.getRandomRestaurant = function () {
            return restaurants[Math.floor(Math.random() * restaurants.length)];
        };

        return factory;
    };

    angular.module('restaurantApp').factory('restaurantsFactory',restaurantsFactory);

    angular.module('restaurantApp').value('appSettings',{
        title:'LunchSpinner',
        version:'1.0'
    });

}());