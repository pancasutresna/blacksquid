(function() {
    'use strict';

    angular
    .module('blocks.exception')
    .provider('exceptionConfig', exceptionConfigProvider)
    .config(exceptionConfig);

    function exceptionConfigProvider() {
        /* jshint validthis:true */
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

    exceptionConfig.$inject = ['$provide'];
    function exceptionConfig($provide) {
        // extendExceptionHandler default exceptionHandler
        $provide.decorator('$exceptionHandler', extendExceptionHandler);
    }

    extendExceptionHandler.$inject = ['$delegate', 'exceptionConfig', 'logger'];
    function extendExceptionHandler($delegate, exceptionConfig, logger) {
        return function(exception, cause) {
            var appErrorPrefix = exceptionConfig.config.appErrorPrefix || '';
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
    }

})();
