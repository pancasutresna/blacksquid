(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller(
            'mvProfileCtrl',
            ['$scope', 'mvAuth', 'mvIdentity', 'logger',
            function($scope, mvAuth, mvIdentity, logger) {

                $scope.email = mvIdentity.currentUser.username;
                $scope.firstName = mvIdentity.currentUser.firstName;
                $scope.lastName = mvIdentity.currentUser.lastName;

                $scope.update = function() {
                    var newUserData = {
                        username: $scope.email,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName
                    };

                    // save changed password if user fillin the password field
                    if ($scope.password && $scope.password.length > 0) {
                        newUserData.password = $scope.password;
                    }

                    mvAuth.updateCurrentUser(newUserData).then(function() {
                        logger.info('Your user account has been updated');
                    }, function(reason) {
                        logger.error(reason);
                    });
                };
            }]
        );
})();
