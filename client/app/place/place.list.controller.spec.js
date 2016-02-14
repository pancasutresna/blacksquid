/* jshint -W117, -W030 */
describe('PlaceListController', function() {
    var controller;
    var scope;
    //var place;

    beforeEach(module('app.place'));

    beforeEach(inject(function($controller, $rootScope) {

        scope = $rootScope.$new();

        PlaceResourceCacheStub = sinon.stub({
            query: function() { }
        });

        controller = $controller('PlaceListController', {
            $scope: scope,
            'PlaceResourceCache': PlaceResourceCacheStub
        });

    }));

    it('Controller exist', function() {
        expect(controller).to.exist;
    });

    it('Call places once', function() {
        scope.places;
        expect(PlaceResourceCacheStub.query.calledOnce).to.be.true;
    });

});
