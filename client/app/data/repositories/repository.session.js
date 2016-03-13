(function() {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.session', RepositorySession);

    RepositorySession.$inject = ['breeze.config', 'model', 'repository.abstract'];

    function RepositorySession(breezeConfig, model, AbstractRepository) {
        var breeze = breezeConfig.breeze;
        var entityName = model.entityName.session;
        
    }
})();