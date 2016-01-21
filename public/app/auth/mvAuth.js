(function(){
    'use strict';

    angular.module('app').factory('mvAuth', function($http, $q, mvUser, mvUserResource){
        return {
            authenticateUser: function(username, password){
                var dfd = $q.defer();
                $http.post('/login', {username:username, password: password}).then(function(response){
                    if(response.data.success){
                        var user = new mvUserResource();
                        angular.extend(user, response.data.user);
                        mvUser.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },
            logoutUser: function(){
                var dfd = $q.defer();
                $http.post('/logout', {logout:true}).then(function(){
                    mvUser.currentUser = undefined;
                    dfd.resolve();
                });
                return dfd.promise
            }
        };
    });
})();
