(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory(
            'exception', 
            ['logger',
            function(logger) {
                /*
                 * Define expossed services
                 */
                var service = {
                    catcher: catcher
                };

                return service;

                //////////////////////////////////
                /*
                 * Service implementation details
                 */
                function catcher(message) {
                    return function(reason) {
                        logger.error(message, reason);
                    };
                }
            }]
        );
})();
