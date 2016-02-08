(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'PlaceResourceCache'];
    function MainController($scope, PlaceResourceCache) {
        $scope.places = PlaceResourceCache.query();
    }

})();
