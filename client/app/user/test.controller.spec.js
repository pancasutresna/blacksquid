/* jshint -W117, -W030 */
describe('TestController', function() {
    var ctrl;
    var scope;

    beforeEach(function() {
        module('app.test');
        bard.inject('$controller', '$rootScope');
    });

    beforeEach(function() {
        scope = $rootScope.$new();
        ctrl = $controller('TestController', {
            $scope: scope
        });
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('$scope.testLog', function() {
        it('should be created successfully', function() {
            expect(ctrl).to.be.defined;
        });
    });
});
