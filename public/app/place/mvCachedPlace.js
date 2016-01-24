(function(){
    'use strict';

    angular
        .module('app')
        .factory('mvCachedPlace', function(mvPlace){
            var placeList;

            return {
                query: function(){
                    if(!placeList){
                        placeList = mvPlace.query();
                    }

                    return placeList;
                }
            }
        })
})();
