(function() {
    'use strict';

    angular
    .module('app.user')
    .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$q', '$cookieStore', '$rootScope', 'IdentityFactory', 'UserResource'];
    function UserFactory($http, $q, $cookieStore, $rootScope, IdentityFactory, UserResource) {

        var authorize = {
            admin: {
                auth: function() {
                    return authorizeUser('admin');
                }
            },
            user: {
                auth: function() {
                    return authorizeAuthenticatedUser();
                }
            }
        };

        var service = {
            authorize: authorize,
            createUser: createUser,
            updateCurrentUser: updateCurrentUser,
            authenticateUser: authenticateUser,
            logoutUser: logoutUser
        };

        return service;

        ///////////////////////////////////////////////////////////

        function createUser(newUserData) {
            var newUser = new UserResource(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function() {
                IdentityFactory.currentUser = newUser;
                dfd.resolve();
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }

        function updateCurrentUser(newUserData) {
            var dfd = $q.defer();
            var clone = angular.copy(IdentityFactory.currentUser);
            angular.extend(clone, newUserData);
            clone.$update().then(
                function() {
                    IdentityFactory.currentUser = clone;
                    dfd.resolve();
                },
                function(response) {
                    dfd.reject(response.data.reason);
                }
            );

            return dfd.promise;
        }

        function authenticateUser(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password: password})
            .then(function(response) {
                if (response.data.success) {
                    var user = new UserResource();
                    angular.extend(user, response.data.user);
                    IdentityFactory.currentUser = user;

                    /*
                     * create new cookie object for storing currentUser credential
                     */
                    var  bootstrappedUserObject = IdentityFactory.currentUser;
                    $cookieStore.put('bootstrappedUser', bootstrappedUserObject);

                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        }

        function logoutUser() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                IdentityFactory.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        }

        function authorizeUser(role) {
            if (IdentityFactory.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }

        function authorizeAuthenticatedUser() {
            if (IdentityFactory.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('Not authorized');
            }
        }
    }

})();
