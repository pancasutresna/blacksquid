(function() {
    'use strict';

    angular
    .module('app.place')
    .factory('mvPlace', mvPlace);

    mvPlace.$inject = ['$resource'];
    function mvPlace($resource) {
        // _id is used in the mvPlaceDetailCtrl
        var placeResource = $resource('/api/places/:_id', {_id: '@id'}, {
            update: {method: 'PUT', isArray: false}
        });

        return placeResource;
    }

})();
