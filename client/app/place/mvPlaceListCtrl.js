(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('mvPlaceListCtrl', mvPlaceListCtrl);

    mvPlaceListCtrl.$inject =  ['$scope', 'mvCachedPlace'];
    function mvPlaceListCtrl($scope, mvCachedPlace) {
        $scope.places = mvCachedPlace.query();

        $scope.sortOptions = [
            {value: 'title', text: 'Sort by Title'},
            {value: 'published', text: 'Sort by publish data'}
        ];

        $scope.sortOrder = $scope.sortOptions[0].value;
    }

})();
