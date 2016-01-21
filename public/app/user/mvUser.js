(function(){
    'use strict';

    angular
        .module('app')
        .factory('mvUser', function($window, mvUserResource){

            var currentUser;
            if(!!$window.bootstrappedUserObject){
                currentUser = new mvUserResource();
                angular.extend(currentUser, $window.bootstrappedUserObject);
            }

            return {
                currentUser: currentUser,
                isAuthenticated: function(){
                    return !!this.currentUser;
                }
            };
        });
})();
