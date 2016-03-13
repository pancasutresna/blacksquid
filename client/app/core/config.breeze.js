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
            // localSessionSort: mongoSessionSort,
            removeServiceName: 'breeze/Breeze'
        };

        configureMongoForBreeze();

        return services;

        ////////////////////////////////

        function configureMongoForBreeze() {
            new breeze.ValidationOptions({validateOnAttach: false}).setAsDefault();
            breeze.config.initializeAdapterInstance('dataService', 'mongo', true);
            setMongoDbNamingConvention();
        }

        // function mongoSessionSort(sessions) {
        //     // must sort sessions locally
        //     // because MongoDb lacks relationships to TimeSlot and Speaker
        //     // so it can't perform the proper sort on the data tier
        //     // This sort should reproduce effect of 'orderBy' in repository.session.js
        //     sessions.sort(function(left, right) {
        //         if (left.timeSlot.start < right.timeSlot.start) {
        //             return -1;
        //         }
        //         if (left.timeSlot.start > right.timeSlot.start) {
        //             return 1;
        //         }
        //         if (left.speaker.firstName < right.speaker.firstName) {
        //             return -1;
        //         }
        //         if (left.speaker.firstName > right.speaker.firstName) {
        //             return 1;
        //         }
        //         if (left.title < right.title) {
        //             return -1;
        //         }
        //         return (left.title > right.title) ? 1 : 0;
        //     });
        // }

        function setMongoDbNamingConvention() {
            var convention = new breeze.NamingConvention({
                name: 'mongo-naming-convention',
                serverProperyNameToClient: function(serverPropertyName) {
                    switch (serverPropertyName) {
                        case '_id':
                            return 'id';
                        default:
                            return serverPropertyName;
                    }
                },
                clientPropertyNameToServer: function(clientPropertyName) {
                    switch (clientPropertyName) {
                        case 'id':
                            return '_id';
                        default:
                            return clientPropertyName;
                    }
                }
            });
            convention.setAsDefault();
        }
    }

    configure.$inject = ['config', 'zDirectivesConfigProvider', 'zStorageConfigProvider'];
    /* @ngInject */
    function configure(config, zDir, zStore) {

        // setup Breeze-based online storage
        zStore.config = {
            // zStorage
            enabled: false,
            key: 'CCAngularBreeze',
            events: config.events.storage,

            // zStorageWip
            wipKey: 'CCAngularBreeze.wip',
            appErrorPrefix: config.appErrorPrefix,
            newGuid: breeze.core.getUuid, // TODO: global potentially variables 

            // zStorageCore
            version: config.version
        };

        configureZValidate();

        function configureZValidate() {
            //#region (Optional) Configure the Breeze Validation Directive

            // We're having fun proving we can tweak the way errors are presented
            // We would be fine with the out-of-the-box format
            zDir.zValidateTemplate =
                '<span class="invalid"><i class="fa fa-warning-sign"></i>' +
                'Inconceivable! %error%</span>';

            //zDir.zRequiredTemplate =
            //    '<i class="fa fa-asterisk fa-asterisk-invalid z-required" title="Required"></i>';

            // Learning Point:
            // Can configure during config or app.run phase
            //app.run(['zDirectivesConfig', function(zDir) {
            //    zDir.zValidateTemplate =
            //                 '<span class="invalid"><i class="fa fa-warning-sign"></i>' +
            //                 'Inconceivable! %error%</span>';
            //}]);

            //#endregion
        }
    }

})();
