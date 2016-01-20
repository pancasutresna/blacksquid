(function(){
    'use strict';

    angular.module('app').factory('mvAuth', function($http, mvUser, $q){
        return {
            authenticateUser: function(username, password){
                var dfd = $q.defer();
                $http.post('/login', {username:username, password: password}).then(function(response){
                    if(response.data.success){
                        mvUser.currentUser = response.data.user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            }
        };
    });
})();
