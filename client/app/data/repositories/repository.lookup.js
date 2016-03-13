(function() {
    'use strict';

    angular
        .module('app.data')
        .factory('repository.lookup', RepositoryLookup);

    RepositoryLookup.$inject = ['breeze', 'model', 'repository.abstract'];

    function RepositoryLookup(breeze, model, AbstractRepository) {
        var entityName = 'lookups';
        var entityNames = model.entityNames;

        return {
            create: createRepo // factory function to create the repository
        };

        ///////////////////////////

        function createRepo(manager) {
            var base = new AbstractRepository(manager, entityName);
            var cacheLookups;
            var repo = {
                getAll: getAll,
                get cacheData() {
                    return getCachedLookups();
                } // shortcut 'getter' syntax
            };

            return repo;

            function getAll() {
                return breeze.EntityQuery.from('Lookups')
                    .using(manager).execute()
                    .then(processLookups).catch(base.queryFailed);

                function processLookups(data) {
                    model.createNullos(manager);
                    base.logger.info('Retrieved lookups', data);
                    base.zStorage.save();
                    return true;
                }
            }

            function getCachedLookups() {
                if (!cacheLookups) {
                    cacheLookups = {
                        rooms: base.getAllLocal(entityNames.room, 'name'),
                        track: base.getAllLocal(entityNames.track, 'name'),
                        timelots: base.getAllLocal(entityNames.timelot, 'start')
                    };
                }
                return cacheLookups;
            }
        }
    }
})();
