(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$http', '$cookieStore', 'IdentityFactory',
    'LoggerFactory', 'UserFactory', '$location'];
    function LoginController($scope, $http, $cookieStore, IdentityFactory,
        LoggerFactory, UserFactory, $location) {

        $scope.identity = IdentityFactory;
        $scope.signin = function(username, password) {
            UserFactory.authenticateUser(username, password).then(function(success) {
                if (success) {
                    LoggerFactory.info('You have successfully signed in!');
                } else {
                    LoggerFactory.warning('Username/password combination incorrent');
                }
            });
        };

        $scope.signout = function() {
            UserFactory.logoutUser().then(function() {
                $cookieStore.remove('bootstrappedUser');
                $scope.username = '';
                $scope.password = '';
                LoggerFactory.info('You have successfully signed out!');
                $location.path('/');
            });
        };
    }

})();
