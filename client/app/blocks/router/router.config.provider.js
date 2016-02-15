(function() {
    'use strict';

    angular
    .module('blocks.router')
    .provider('RouterConfig', RouterConfig);

    function RouterConfig() {
        this.config = {
            // These are the properties we need to set
            $routeProvider: undefined,
            docTitle: '',
            resolveAlways: {ready: function() {}}
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

})();
