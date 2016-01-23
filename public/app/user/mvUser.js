(function(){
    'use strict';

    angular
        .module('app')
        .factory('mvUser', function($resource){
            var UserResource = $resource('/api/users/:id', {_id: "@id"});

            UserResource.prototype.isAdmin  = function(){
                return this.roles && this.roles.indexOf('admin') > -1;
            }

            return UserResource;

        });
})();

// (function(){
//     'use strict';
//
//     angular
//         .module('app')
//         .factory('mvUser', function($window, mvUserResource){
//
//             var currentUser;
//             if(!!$window.bootstrappedUserObject){
//                 currentUser = new mvUserResource();
//                 angular.extend(currentUser, $window.bootstrappedUserObject);
//             }
//
//             return {
//                 currentUser: currentUser,
//                 isAuthenticated: function(){
//                     return !!this.currentUser;
//                 },
//                 isAuthorized: function(role){
//                     return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1
//                 }
//             };
//         });
// })();
