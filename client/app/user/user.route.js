(function() {
    'use strict';

    angular
    .module('app.user')
    .run(routeConfig);

    routeConfig.$inject = ['routehelper', 'UserFactory'];
    function routeConfig(routehelper, UserFactory) {
        var routes = [
            {
                url: '/signup',
                config: {
                    templateUrl:'/app/user/form-signup.html',
                    controller: 'SignupController',
                    controllerAs: 'vm'
                }
            }, {
                url: '/profile',
                config: {
                    templateUrl: '/app/user/form-profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    resolve: UserFactory.authorize.user
                }
            }
        ];

        routehelper.configureRoutes(routes);
    }

})();
