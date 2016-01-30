(function(){
    'use strict';

    angular.module('app', [
        'app.core',
        'app.main',
        'app.place',
        'app.auth',
        'app.user',
        'app.admin'
    ]);

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
