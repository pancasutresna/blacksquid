(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .provider(
            'exceptionHandler',
            [function() {
                var exceptionHandler = this;

                exceptionHandler.config = {
                    appErrorPrefix: undefined
                };

                exceptionHandler.configure = function(appErrorPrefix) {
                    this.config.appErrorPrefix = appErrorPrefix;
                };

                exceptionHandler.$get = function() {
                    return {
                        config: this.config
                    };
                };
            }]
        )
        .config(
            ['$provide',
            function($provide) {
                // extend default exceptionHandler
                $provide.decorator(
                    '$exceptionHandler',
                    ['$delegate', 'exceptionHandler', 'logger',
                    function($delegate, exceptionHandler, logger) {
                        return function(exception, cause) {
                            var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
                            var errorData = {
                                exception: exception,
                                cause: cause
                            };
                            exception.message = appErrorPrefix + exception.message;

                            // call default exception handler
                            $delegate(exception, cause);

                            /**
                             * Could add the error to a service's collection,
                             * add errors to $rootScope, log errors to remote web server,
                             * or log locally. Or throw hard. It is entirely up to you.
                             * throw exception;
                             *
                             * @example
                             *     throw { message: 'error message we added' };
                             */
                            logger.error(exception.message, errorData);
                        };
                    }]
                );
            }]
        );
})();
