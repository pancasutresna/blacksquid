(function(){
    'use strict';

    angular
        .module('app.auth')
        .controller('mvLoginCtrl', function($scope, $http, mvIdentity, logger, mvAuth, $location) {
            $scope.identity = mvIdentity;
            $scope.signin = function(username, password) {
                mvAuth.authenticateUser(username, password).then(function(success) {
                    if (success) {
                        logger.info('You have successfully signed in!');
                    } else {
                        logger.warning('Username/password combination incorrent');
                    }
                });
            };

            $scope.signout = function() {
                mvAuth.logoutUser().then(function() {
                    $scope.username = '';
                    $scope.password = '';
                    logger.info('You have successfully signed out!');
                    $location.path('/');
                });
            };
        });
})();