(function() {
    'use strict';

    angular
    .module('app.place')
    .factory('PlaceResourceCache', PlaceResourceCache);

    PlaceResourceCache.$inject = ['PlaceResource'];
    function PlaceResourceCache(PlaceResource) {
        var placeList;

        return {
            query: function() {
                if (!placeList) {
                    placeList = PlaceResource.query();
                }

                return placeList;
            }
        };
    }

})();
