(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('mvIdentity', function($window, $cookieStore, mvUser) {

            var currentUser;
            /**
             * get currentUser object from $cookieStore
             */
            if (!!$cookieStore.get('bootstrappedUser')) {
                currentUser = new mvUser();
                angular.extend(currentUser, $cookieStore.get('bootstrappedUser'));
            }

            return {
                currentUser: currentUser,
                isAuthenticated: function() {
                    return !!this.currentUser;
                },
                isAuthorized: function(role) {
                    return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
                }
            };
        });
})();
