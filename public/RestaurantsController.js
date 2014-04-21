angular.module('restaurantApp').controller('RestaurantsController', function ($scope){
    $scope.restaurants =  [
        {name:'Whole Foods',type:'eclectic'},
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
});

