(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('PlaceDetailController', PlaceDetailController);

    PlaceDetailController.$inject = ['PlaceResourceCache', '$routeParams'];
    function PlaceDetailController(PlaceResourceCache, $routeParams) {
        var vm = this;
        PlaceResourceCache.query().$promise.then(function(collection) {
            collection.forEach(function(place) {
                if (place._id === $routeParams.id) {
                    vm.place = place;
                }
            });
        });
    }

})();
