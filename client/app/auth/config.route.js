(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(routeConfig);

    routeConfig.$inject = ['routehelper'];
    function routeConfig(routehelper) {
        var routes = [
            {
                url: '/signup',
                config: {
                    // templateUrl:'/partials/auth/form-signup',
                    templateUrl:'/app/auth/form-signup.html',
                    controller: 'mvSignupCtrl'
                }
            },
            {
                url: '/profile',
                config: {
                    // templateUrl: '/partials/auth/form-profile',
                    templateUrl: '/app/auth/form-profile.html',
                    controller: 'mvProfileCtrl',
                    resolve: routehelper.routeRoleChecks.user
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();
