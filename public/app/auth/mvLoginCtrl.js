(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvLoginCtrl', function($scope, $http, mvUser, mvNotifier, mvAuth){
            $scope.user = mvUser;
            $scope.signin = function(username, password){
                mvAuth.authenticateUser(username, password).then(function(success){
                    if(success){
                        mvNotifier.notify('You have successfully signed in!');
                    } else {
                        mvNotifier.notify('Username/password combination incorrent');
                    }
                });
            }
        });

})();
