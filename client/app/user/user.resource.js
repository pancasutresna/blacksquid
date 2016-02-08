(function() {
    'use strict';

    angular
    .module('app.user')
    .factory('UserResource', UserResource);

    UserResource.$inject = ['$resource'];
    function UserResource($resource) {
        var userResource = $resource('/api/users/:id', {
            _id: '@id'
        }, {
            update: {
                method: 'PUT',
                isArray: false
            }
        });

        userResource.prototype.isAdmin  = function() {
            return this.roles && this.roles.indexOf('admin') > -1;
        };

        return userResource;
    }

})();
