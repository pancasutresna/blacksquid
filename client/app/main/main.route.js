(function() {
    'use strict';

    angular
    .module('app.main')
    .run(routeConfig);

    routeConfig.$inject = ['RouterFactory'];
    function routeConfig(RouterFactory) {
        var routes = [
            {
                url: '/',
                config: {
                    templateUrl:'/app/main/main.html',
                    controller: 'MainController'
                }
            }
        ];

        RouterFactory.configureRoutes(routes);
    }

})();
