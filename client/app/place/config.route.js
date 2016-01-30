(function(){
    'use strict';

    angular
        .module('app.place')
        .run(appRun);

    /*
     * Call routehelper on module blocks.router
     */
    appRun.$inject = ['routehelper'];
    function appRun(routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes(){
        return [
            {
                url: '/places',
                config: {
                    templateUrl: '/partials/place/place-list',
                    controller: 'mvPlaceListCtrl'
                }
            },
            {
                url: '/places/:id',
                config: {
                    templateUrl: '/partials/place/place-detail',
                    controller: 'mvPlaceDetailCtrl'
                }
            }
        ];
    }
})();