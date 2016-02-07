(function() {
    'use strict';

    angular
    .module('app.place')
    .factory('mvCachedPlace', mvCachedPlace);

    mvCachedPlace.$inject = ['mvPlace'];
    function mvCachedPlace(mvPlace) {
        var placeList;

        return {
            query: function() {
                if (!placeList) {
                    placeList = mvPlace.query();
                }

                return placeList;
            }
        };
    }

})();
