(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('PlaceDetailController', PlaceDetailController);

    PlaceDetailController.$inject = ['$scope', 'PlaceResourceCache', '$routeParams'];
    function PlaceDetailController($scope, PlaceResourceCache, $routeParams) {
        PlaceResourceCache.query().$promise.then(function(collection) {
            collection.forEach(function(place) {
                if (place._id === $routeParams.id) {
                    $scope.place = place;
                }
            });
        });
    }

})();
