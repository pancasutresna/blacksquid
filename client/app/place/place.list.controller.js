(function() {
    'use strict';

    angular
    .module('app.place')
    .controller('PlaceListController', PlaceListController);

    PlaceListController.$inject =  ['PlaceResourceCache'];
    function PlaceListController(PlaceResourceCache) {
        var vm = this;
        vm.places = PlaceResourceCache.query();

        vm.sortOptions = [
            {value: 'title', text: 'Sort by Title'},
            {value: 'published', text: 'Sort by publish data'}
        ];

        vm.sortOrder = vm.sortOptions[0].value;
    }

})();
