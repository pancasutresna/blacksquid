(function() {
    'use strict';

    angular
    .module('blocks.exception')
    .factory('ExceptionFactory', ExceptionFactory);

    ExceptionFactory.$inject = ['LoggerFactory'];
    function ExceptionFactory(LoggerFactory) {
        var service = {
            catcher: catcher
        };

        return service;

        //////////////////////////////////

        function catcher(message) {
            // what the hell is this for
            return function(reason) {
                LoggerFactory.error(message, reason);
            };
        }

    }

})();
