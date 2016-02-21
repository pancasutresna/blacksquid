(function() {
    'use strict';

    angular
    .module('app.user')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$cookieStore', 'IdentityFactory',
    'logger', 'UserFactory', '$location'];
    function LoginController($http, $cookieStore, IdentityFactory,
        logger, UserFactory, $location) {
        var vm = this;
        vm.identity = IdentityFactory;
        vm.signin = function(username, password) {
            UserFactory.authenticateUser(username, password).then(function(success) {
                if (success) {
                    logger.info('You have successfully signed in!');
                } else {
                    logger.warning('Username/password combination incorrent');
                }
            });
        };

        vm.signout = function() {
            UserFactory.logoutUser().then(function() {
                $cookieStore.remove('bootstrappedUser');
                vm.username = '';
                vm.password = '';
                logger.info('You have successfully signed out!');
                $location.path('/');
            });
        };
    }

})();
