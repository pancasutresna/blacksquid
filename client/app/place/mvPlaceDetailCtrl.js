(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('mvPlaceDetailCtrl', mvPlaceDetailCtrl);

    mvPlaceDetailCtrl.$inject = ['$scope', 'mvCachedPlace', '$routeParams'];
    function mvPlaceDetailCtrl($scope, mvCachedPlace, $routeParams) {
        //$scope.place = mvPlace.get({_id:$routeParams.id});
        mvCachedPlace.query().$promise.then(function(collection) {
            collection.forEach(function(place) {
                if (place._id === $routeParams.id) {
                    $scope.place = place;
                }
            });
        });
    }

})();
