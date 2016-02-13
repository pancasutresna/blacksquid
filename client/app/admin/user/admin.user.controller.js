(function () {
    'use strict';

    angular.module('app.admin.user')
    .controller('AdminUserController', AdminUserController);

    AdminUserController.$inject = ['$scope', 'UserResource'];
    function AdminUserController($scope, UserResource) {
        
        $scope.users = UserResource.query(
            function () {
                console.log('scope users: ' + $scope.users.length);
            }
        );
    }

})();
