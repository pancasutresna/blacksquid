(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'app.admin.user',
        'app.main',
        'app.user',
        'app.place'

    ]);

    /**
     * Called when controller resolve reject invoked
     */
    angular
    .module('app')
    .run(
        ['$rootScope', '$location',
        function($rootScope, $location) {
            $rootScope.$on(
                '$routeChangeError',
                function(evt, current, previous, rejection) {
                    if (rejection === 'not authorized') {
                        $location.path('/');
                    }
                }
            );
        }]
    );

})();
