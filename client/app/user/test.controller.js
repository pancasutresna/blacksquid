(function() {
    'use strict';

    angular
    .module('app.test', [])
    .controller('TestController', TestController);

    TestController.$inject = ['$scope'];
    function TestController($scope) {

        $scope.testLog = function(msg) {
            //LoggerFactory.info(msg);

            return true;
        };
    }

})();
