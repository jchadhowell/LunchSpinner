(function(){
    var RestaurantsController = function ($scope, restaurantsFactory, appSettings){




        function init() {
            $scope.restaurant = {name:'???',type:''};
            $scope.appSettings = appSettings;
        }

        init();

        $scope.setRandomRestaurant = function(){
            restaurantsFactory.getRandomRestaurant().then(function (restaurant){
                $scope.restaurant = restaurant;
            });
        };

    };

    RestaurantsController.$inject = ['$scope','restaurantsFactory', 'appSettings'];

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

