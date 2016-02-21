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
                    templateUrl:'/app/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();
