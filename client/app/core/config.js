(function() {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[black squid Error]',
        appTitle: 'black squid',
        version: '1.0.0'
    };

    core.value('config', config);

    core.config(configure);

    /**
     *
     * @param $logProvider
     * @param $routeProvider
     * @param routeHelperConfigProvider
     * @param exceptionHandlerProvider
     */
    /*
     * routehelperConfigProvider -> routehelperConfig + suffix (Provider) as well as exceptionHandlerProvider
     */
    configure.$inject = ['$logProvider', '$routeProvider', '$locationProvider',
                         'routehelperConfigProvider', 'exceptionHandlerProvider'];
    function configure($logProvider, $routeProvider, $locationProvider,
                        routehelperConfigProvider, exceptionHandlerProvider) {

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // configure commmon route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'black squid';

        var resolveAlways = {
            //ready: ['dataservice', function(dataservice){
            //    return dataservice.ready();
            //}]
        };

        routehelperConfigProvider.config.resolveAlways = resolveAlways;
        //
        //// Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);

    }

})();
