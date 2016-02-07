(function () {
    'use strict';

    angular.module('app.admin')
    .controller('mvAdminUserListCtrl', mvAdminUserListCtrl);

    mvAdminUserListCtrl.$inject = ['$scope', 'mvUser'];
    function mvAdminUserListCtrl($scope, mvUser) {
        $scope.users = mvUser.query(
            function () {
                console.log('scope users: ' + $scope.users.length);
            }
        );
    }

})();
