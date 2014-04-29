(function(){
    var RestaurantsController = function ($scope, restaurantsFactory){

        function init() {
            $scope.restaurant = {name:'???',type:''};
        }

        init();

        $scope.setRandomRestaurant = function(){
            $scope.restaurant =  restaurantsFactory.getRandomRestaurant();
        };

    };

    RestaurantsController.$inject = ['$scope','restaurantsFactory'];

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

