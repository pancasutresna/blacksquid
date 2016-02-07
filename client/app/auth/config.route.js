(function() {
    'use strict';

    angular
        .module('app.auth')
        .run(
            ['routehelper',
            function(routehelper) {
                var routes = [
                    {
                        url: '/signup',
                        config: {
                            templateUrl:'/app/auth/form-signup.html',
                            controller: 'mvSignupCtrl'
                        }
                    }, {
                        url: '/profile',
                        config: {
                            templateUrl: '/app/auth/form-profile.html',
                            controller: 'mvProfileCtrl',
                            resolve: routehelper.routeRoleChecks.user
                        }
                    }
                ];

                routehelper.configureRoutes(routes);
            }]
        );

})();
