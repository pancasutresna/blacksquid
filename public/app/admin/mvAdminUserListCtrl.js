(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvAdminUserListCtrl', function($scope, mvUser){
            $scope.users = mvUser.query(function(){
                console.log('scope users: ' + $scope.users.length);
            });
        });

})();
