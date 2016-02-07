(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller(
            'mvAdminUserListCtrl',
            ['$scope', 'mvUser',
            function($scope, mvUser) {
                $scope.users = mvUser.query(
                    function () {
                        console.log('scope users: ' + $scope.users.length);
                    }
                );
            }]
        );
})();
