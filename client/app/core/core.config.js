(function() {
    'use strict';

    var keyCodes = {
        backspace: 8,
        tab: 9,
        enter: 13,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        insert: 45,
        del: 46
    };

    var imageSettings = {
        imageBasePath: '../content/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        entitiesChanged: 'datacontext.entitiesChanged',
        entitiesImported: 'datacontext.entitiesImported',
        hasChangesChanged: 'datacontext.hasChangesChanged',
        storage: {
            error: 'store.error',
            storeChanged: 'store.changed',
            wipChanged: 'wip.changed'
        }
    };

    var config = {
        appErrorPrefix: '[BLACK SQUID ERROR]',
        events: events,
        imageSettings: imageSettings,
        keyCodes: keyCodes,
        appTitle: 'black squid',
        version: '1.0.0'
    };

    /////////////////////////////////////////////////////////

    var core = angular.module('app.core');
    core.config(toastrConfig);
    core.constant('config', config);
    core.config(configure);

    /* @ngInject */
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    configure.$inject = ['$logProvider', '$routeProvider', '$locationProvider',
    'routehelperConfigProvider', 'exceptionConfigProvider', 'toastr'];
    function configure($logProvider, $routeProvider, $locationProvider,
        routehelperConfigProvider, exceptionConfigProvider, toastr) {

        configureLocation();
        configureToastr();
        configureLogging();
        configureException();
        configureRouting();

        function configureLocation() {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }

        function configureToastr() {
            toastr.options.timeOut = 4000;
            toastr.options.positionClass = 'toast-bottom-right';
        }

        function configureLogging() {
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }

        function configureException() {
            exceptionConfigProvider.configure(config.appErrorPrefix);
        }

        function configureRouting() {
            var routeCfg = routehelperConfigProvider;
            routeCfg.config.$routeProvider = $routeProvider;
            routeCfg.config.docTitle = 'black squid';
            routeCfg.config.resolveAlways = {
            //ready: ['dataservice', function(dataservice){
            //    return dataservice.ready();
            //}]
            };
        }
    }
})();
