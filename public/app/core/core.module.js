(function(){
    'use strict';

    angular
        .module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource',
        /*
         * Reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router'

        /*
         * 3rd party modules
         */
    ]);
})();