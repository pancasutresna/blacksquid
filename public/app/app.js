(function(){
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute']);

    angular
        .module('app')
        .config(function($routeProvider, $locationProvider){
            var routeRoleChecks = {
                admin: {
                    auth: function(mvAuth){
                        return mvAuth.authorizeCurrentUserForRoute('admin');
                    }
                }
            }

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider
                .when('/', {
                    templateUrl: '/partials/main/content-main',
                    controller: 'mvMainCtrl'
                })
                .when('/admin/users', {
                    templateUrl: '/partials/admin/user-list',
                    controller: 'mvAdminUserListCtrl',
                    resolve: routeRoleChecks.admin
                });
        });

        /**
         * Called when controller resolve reject invoked
         */
        angular.module('app').run(function($rootScope, $location){
            $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
                if(rejection === 'not authorized'){
                    $location.path('/');
                }
            });
        });



})();
