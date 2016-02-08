(function() {
    'use strict';

    angular
    .module('app.user')
    .run(routeConfig);

    routeConfig.$inject = ['RouterFactory', 'UserFactory'];
    function routeConfig(RouterFactory, UserFactory) {
        var routes = [
            {
                url: '/signup',
                config: {
                    templateUrl:'/app/user/form-signup.html',
                    controller: 'SignupController'
                }
            }, {
                url: '/profile',
                config: {
                    templateUrl: '/app/user/form-profile.html',
                    controller: 'ProfileController',
                    resolve: UserFactory.authorize.user
                }
            }
        ];

        RouterFactory.configureRoutes(routes);
    }

})();
