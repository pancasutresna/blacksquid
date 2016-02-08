(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', 'UserFactory', 'IdentityFactory', 'LoggerFactory'];
    function ProfileController($scope, UserFactory, IdentityFactory, LoggerFactory) {

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
                LoggerFactory.info('Your user account has been updated');
            }, function(reason) {
                LoggerFactory.error(reason);
            });
        };
    }

})();
