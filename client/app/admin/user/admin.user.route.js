(function() {
    'use strict';

    angular
        .module('app.admin.user')
        .run(routeConfig);

    /* @ngInject */
    routeConfig.$inject = ['routehelper', 'UserFactory'];
    function routeConfig(routehelper, UserFactory) {
        routehelper.configureRoutes(getRoutes(UserFactory));
    }

    function getRoutes(UserFactory) {
        return [
            {
                url: '/admin/users',
                config: {
                    templateUrl: '/app/admin/user/admin-user-list.html',
                    controller: 'AdminUserController',
                    controllerAs: 'vm',
                    resolve: UserFactory.authorize.admin
                }
            }
        ];
    }

})();
