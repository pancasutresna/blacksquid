(function(){
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    exception.$inject = ['logger'];
    function exception(logger){
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
        function catcher(message){
            return function(reason){
                logger.error(message, reason);
            }
        }
    }
})();