(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvMainCtrl', function($scope, mvCachedPlace){
            $scope.places = mvCachedPlace.query();
        });
})();
