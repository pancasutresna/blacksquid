(function(){
    'use strict';

    angular
        .module('app.admin')
        .run(configRoute);

    configRoute.$inject = ['routehelper'];
    function configRoute(routehelper){
        var routes = [
            {
                url: '/admin/users',
                config: {
                    templateUrl: '/partials/admin/user-list',
                    controller: 'mvAdminUserListCtrl',
                    resolve: routehelper.routeRoleChecks.admin
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();