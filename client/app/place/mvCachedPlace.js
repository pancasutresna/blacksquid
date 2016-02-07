(function() {
    'use strict';

    angular
        .module('app.place')
        .factory(
            'mvCachedPlace',
            ['mvPlace',
            function(mvPlace) {
                var placeList;

                return {
                    query: function() {
                        if (!placeList) {
                            placeList = mvPlace.query();
                        }

                        return placeList;
                    }
                };
            }]
        );
})();
