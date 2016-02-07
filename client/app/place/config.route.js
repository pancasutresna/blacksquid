(function() {
    'use strict';

    angular
        .module('app.place')
        .run(
            ['routehelper',
            function(routehelper) {

                var routes = [
                    {
                        url: '/places',
                        config: {
                            templateUrl: '/app/place/place-list.html',
                            controller: 'mvPlaceListCtrl'
                        }
                    },
                    {
                        url: '/places/:id',
                        config: {
                            templateUrl: '/app/place/place-detail.html',
                            controller: 'mvPlaceDetailCtrl'
                        }
                    }
                ];

                routehelper.configureRoutes(routes);
            }]
        );
})();
