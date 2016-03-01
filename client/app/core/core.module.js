(function() {
    'use strict';

    angular
        .module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource', 'ngCookies',
        /*
         * Reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',

        /*
         * 3rd party modules
         */
         'ui.bootstrap',
         'breeze.angular',
         'breeze.directives',
         'ngplus',
         'ngzWip'
    ]);
})();
