(function(){
    'use strict';

    angular
        .module('app')
        .controller('mvMainCtrl', function($scope){
            $scope.places = [
                {name: 'Place 1', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 2', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 3', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 4', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 5', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 6', featured: false, published: new Date('1/1/2014')},
                {name: 'Place 7', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 8', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 9', featured: false, published: new Date('1/1/2014')},
                {name: 'Place 10', featured: false, published: new Date('1/1/2014')},
                {name: 'Place 11', featured: true, published: new Date('1/1/2014')},
                {name: 'Place 12', featured: true, published: new Date('1/1/2014')},
            ]
        });
})();
