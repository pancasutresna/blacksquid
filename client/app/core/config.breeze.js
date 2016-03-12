(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('breeze.config', breezeConfig)
        .config(configure);

    breezeConfig.$inject = ['breeze'];
    /* @ngInject */
    function breezeConfig(breeze) {
        var services = {
            breeze: breeze,
            localSessionSort: mongoSessionSort,
            removeServiceName: 'breeze/Breeze'
        };

        configureMongoForBreeze();

        return services;

        ////////////////////////////////

        function configureMongoForBreeze() {
            new breeze.ValidationOptions({validateOnAttach: false});
        }

        function mongoSessionSort() {

        }
    }

})();