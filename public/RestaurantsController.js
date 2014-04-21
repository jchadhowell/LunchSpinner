(function(){
    var RestaurantsController = function ($scope){
        restaurants =  [
            {name:'Whole Foods',type:'Eclectic'},
            {name:'Newks', type:'Sandwich'},
            {name:'Chuys',type:'Tex-mex'},
            {name:'Masala Wok', type:'Indian'},
            {name:'Fire Bowl', type:'Asian'},
            {name:'Panera',type:'sandwich'},
            {name:'Noodles',type:'pasta'}
        ];
        $scope.doSort = function(propName){
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };

        $scope.sortBy = 'name';
        $scope.reverse = false;

        $scope.restaurant = {name:'???',type:''};

        $scope.setRandomRestaurant = function () {
            $scope.restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        };
    };

    angular.module('restaurantApp').controller('RestaurantsController', RestaurantsController);
})();

