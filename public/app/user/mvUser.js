(function(){
    'use strict';

    angular
        .module('app')
        .factory('mvUser', function(){
            return {
                currentUser: undefined,
                isAuthenticated: function(){
                    return !!this.currentUser;
                }
            };
        });
})();
