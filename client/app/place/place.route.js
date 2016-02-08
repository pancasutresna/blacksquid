(function() {
    'use strict';

    angular
    .module('app.place')
    .run(routeConfig);

    routeConfig.$inject = ['RouterFactory'];
    function routeConfig(RouterFactory) {

        var routes = [
            {
                url: '/places',
                config: {
                    templateUrl: '/app/place/place-list.html',
                    controller: 'PlaceListController'
                }
            },
            {
                url: '/places/:id',
                config: {
                    templateUrl: '/app/place/place-detail.html',
                    controller: 'PlaceDetailController'
                }
            }
        ];

        RouterFactory.configureRoutes(routes);
    }

})();
