(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('mvMainCtrl', mvMainCtrl);

    mvMainCtrl.$inject = ['$scope', 'mvCachedPlace'];
    function mvMainCtrl($scope, mvCachedPlace) {
        $scope.places = mvCachedPlace.query();
    }

})();
