(function() {
    'use strict';

    angular
    .module('app.place')
    .factory('PlaceResource', PlaceResource);

    PlaceResource.$inject = ['$resource'];
    function PlaceResource($resource) {
        // _id is used in the PlaceDetailController
        var resource = $resource('/api/places/:_id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });

        return resource;
    }

})();
