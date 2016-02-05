(function() {
    'use strict';

    angular
        .module('app.main')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {
        var routes = [
            {
                url: '/',
                config: {
                    // templateUrl:'/partials/main/content-main',
                    templateUrl:'/app/main/content-main.html',
                    controller: 'mvMainCtrl'
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }
})();
