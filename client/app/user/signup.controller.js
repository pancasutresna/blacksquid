(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', 'UserFactory', 'logger', '$location'];
    function SignupController($scope, UserFactory, logger, $location) {

        $scope.signup = function() {
            var newUserData = {
                username: $scope.email,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName
            };

            UserFactory.createUser(newUserData).then(function() {
                logger.info('New user created!');
                $location.path('/');
            }, function(reason) {
                logger.error(reason);
            });
        };
    }

})();
