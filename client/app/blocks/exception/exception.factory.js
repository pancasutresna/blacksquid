(function() {
    'use strict';

    angular
    .module('blocks.exception')
    .factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger) {
        var service = {
            catcher: catcher
        };

        return service;

        //////////////////////////////////

        function catcher(message) {
            // what the hell is this for
            return function(reason) {
                logger.error(message, reason);
            };
        }

    }

})();
