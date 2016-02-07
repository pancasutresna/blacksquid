(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(
            ['routehelper',
            function(routehelper) {

                var routes = [
                    {
                        url: '/admin/users',
                        config: {
                            templateUrl: '/app/admin/user-list.html',
                            controller: 'mvAdminUserListCtrl',
                            resolve: routehelper.routeRoleChecks.admin
                        }
                    }
                ];

                routehelper.configureRoutes(routes);
            }]
        );

})();
