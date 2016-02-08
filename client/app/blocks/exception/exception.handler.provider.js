(function() {
    'use strict';

    angular
    .module('blocks.exception')
    .provider('ExceptionHandler', ExceptionHandler)
    .config(handlerConfig);

    function ExceptionHandler() {
        this.config = {
            appErrorPrefix: undefined
        };

        this.configure = function(appErrorPrefix) {
            this.config.appErrorPrefix = appErrorPrefix;
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    handlerConfig.$inject = ['$provide'];
    function handlerConfig($provide) {
        // extend default exceptionHandler
        $provide.decorator('$exceptionHandler', extend);

        extend.$inject = ['$delegate', 'ExceptionHandler', 'LoggerFactory'];
        function extend($delegate, ExceptionHandler, LoggerFactory) {
            return function(exception, cause) {
                var appErrorPrefix = ExceptionHandler.config.appErrorPrefix || '';
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
                LoggerFactory.error(exception.message, errorData);
            };
        }
    }

})();
