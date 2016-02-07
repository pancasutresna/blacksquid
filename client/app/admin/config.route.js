(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {

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
    }

})();
