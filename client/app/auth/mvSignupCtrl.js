(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller(
            'mvSignupCtrl',
            ['$scope', 'mvAuth', 'logger', '$location',
            function($scope, mvAuth, logger, $location) {

                $scope.signup = function() {
                    var newUserData = {
                        username: $scope.email,
                        password: $scope.password,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName
                    };

                    mvAuth.createUser(newUserData).then(function() {
                        logger.info('New user created!');
                        $location.path('/');
                    }, function(reason) {
                        logger.error(reason);
                    });
                };
            }
        ]);
})();
