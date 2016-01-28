(function(){
    'use strict';

    angular
        .module('app.auth')
        .run(routeConfig);


    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper){
        var routes = [
            {
                url: '/signup',
                config: {
                    templateUrl:'/partials/auth/form-signup',
                    controller: 'mvSignupCtrl'
                }
            },
            {
                url: '/profile',
                config: {
                    templateUrl: '/partials/auth/form-profile',
                    controller: 'mvProfileCtrl',
                    resolve: routehelper.routeRoleChecks.user
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();