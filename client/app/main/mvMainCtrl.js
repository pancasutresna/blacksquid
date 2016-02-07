(function() {
    'use strict';

    angular
        .module('app.main')
        .controller(
            'mvMainCtrl',
            ['$scope', 'mvCachedPlace',
            function($scope, mvCachedPlace) {
                $scope.places = mvCachedPlace.query();
            }]
        );
})();
