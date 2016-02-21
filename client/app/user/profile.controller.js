(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'UserFactory', 'IdentityFactory', 'logger'];
    function ProfileController($scope, UserFactory, IdentityFactory, logger) {

        $scope.email = IdentityFactory.currentUser.username;
        $scope.firstName = IdentityFactory.currentUser.firstName;
        $scope.lastName = IdentityFactory.currentUser.lastName;

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

            UserFactory.updateCurrentUser(newUserData).then(function() {
                logger.info('Your user account has been updated');
            }, function(reason) {
                logger.error(reason);
            });
        };
    }

})();
