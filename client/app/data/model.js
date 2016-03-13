(function() {
    'use strict';

    var useManualMetadata = true; // true: use model.metadata; false: use generated metadata

    angular
        .module('app.data')
        .factory('model', model);

    model.$inject = ['breeze', 'model-metadata', 'model-validation', 'moment'];
    function model(breeze, manualMetadata, modelValidation, moment) {

        var nulloDate = new Date(1900, 0, 1);
        var nullosExist = false;

        var entityNames = {
            user: 'Person',
            place: 'Place'
        };

        var service = {
            configureMetadataStore: configureMetadataStore,
            createNullos: createNullos,
            entityNames: entityNames,
            extendMetadata: extendMetadata,
            useManualMetadata: useManualMetadata
        };

        return service;

        function configureMetadataStore(metadataStore) {
            registerPerson(metadataStore);
            registerPlace(metadataStore);

            modelValidation.createAndRegister(entityNames);

            if (useManualMetadata) {
                manualMetadata.fillMetadataStore(metadataStore);
                extendMetadata(metadataStore);
            }
        }

        function extendMetadata(metadataStore) {
            modelValidation.applyValidators(metadataStore);
            registerResourceNames(metadataStore);
        }

        function createNullos(manager) {
            if (nullosExist) {
                return;
            }

            nullosExist = true;
            var unchanged = breeze.EntityState.Unchanged;

            createNullo(entityNames.user, {firstName: ' [Select a person]'}); // TODO: come back to this
            createNullo(entityNames.place);

            function createNullo(entityName, values) {
                var initialValues = values || {name: ' [Select a ' + entityName.toLowerCase() + ']'};
                return manager.createEntity(entityName, initialValues, unchanged);
            }
        }

        // Wait to call until entityTypes are loaded in metadata
        function registerResourceNames(metadataStore) {
            // every entityName is its own resource name
            var types = metadataStore.getEntityTypes();
            types.forEach(function(type) {
                if (type instanceof breeze.EntityType) {
                    set(type.shortName, type);
                }
            });

            var personEntityName = entityNames.person;
            ['User'].forEach(function(r) {
                set(r, personEntityName);
            });

            function set(resourceName, entityName) {
                metadataStore.setEntityTypeForResourceName(resourceName, entityName);
            }
        }

        function registerPerson(metadataStore) {
            metadataStore.registerEntityTypeCtor('Person', Person);

            function Person() {
            }

            Object.defineProperty(Person.prototype, 'fullName', {
                get: function() {
                    var fn = this.firstName;
                    var ln = this.lastName;
                    return ln ? fn + ' ' + ln : fn;
                }
            });
        }

        function registerPlace(metadataStore) {
            metadataStore.registerEntityTypeCtor('Place', Place);

            function Place() {
            }

            // TODO: we'll be back here soon
            Object.defineProperty(Place.prototype);
        }

    }
})();
