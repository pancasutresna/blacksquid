(function(){
    'use strict';

    angular
        .module('app')
        .factory('mvPlace', function($resource){
            var placeResource = $resource('/api/places/:_id', {_id: "@id"}, {
                update: {method: 'PUT', isArray: false}
            });

            return placeResource;
        });
})();
