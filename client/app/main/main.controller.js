(function() {
    'use strict';

    angular
    .module('app.main')
    .controller('MainController', MainController);

    MainController.$inject = ['PlaceResourceCache'];
    function MainController(PlaceResourceCache) {
        var vm = this;
        vm.places = PlaceResourceCache.query();
    }

})();
