(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'UserFactory', 'LoggerFactory', '$location'];
    function SignupController($scope, UserFactory, LoggerFactory, $location) {

        $scope.signup = function() {
            var newUserData = {
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            };

            UserFactory.createUser(newUserData).then(function() {
                LoggerFactory.info('New user created!');
                $location.path('/');
            }, function(reason) {
                LoggerFactory.error(reason);
            });
        };
    }

})();
