(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('PlaceListController', PlaceListController);

    PlaceListController.$inject =  ['$scope', 'PlaceResourceCache'];
    function PlaceListController($scope, PlaceResourceCache) {
        $scope.places = PlaceResourceCache.query();

        $scope.sortOptions = [
            {value: 'title', text: 'Sort by Title'},
            {value: 'published', text: 'Sort by publish data'}
        ];

        $scope.sortOrder = $scope.sortOptions[0].value;
    }

})();
