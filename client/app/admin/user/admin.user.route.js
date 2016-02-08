(function() {
    'use strict';

    angular
        .module('app.admin.user')
        .run(routeConfig);

    routeConfig.$inject = ['RouterFactory', 'UserFactory'];
    function routeConfig(RouterFactory, UserFactory) {

        var routes = [
            {
                url: '/admin/users',
                config: {
                    templateUrl: '/app/admin/user/admin-user-list.html',
                    controller: 'AdminUserController',
                    resolve: UserFactory.authorize.admin
                }
            }
        ];

        RouterFactory.configureRoutes(routes);
    }

})();
