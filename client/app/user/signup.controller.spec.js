/* jshint -W117, -W030 */
describe('SignupController', function() {

    var scope;
    var controller;
    var $location;
    var UserFactory;

    beforeEach(module('app.user'));

    beforeEach(module(function($provide) {
        $provide.value('UserFactory', {
            createUser: sinon.stub(),
            authorize: sinon.stub()
        });

        $provide.value('LoggerFactory', {
            info: sinon.stub(),
            error: sinon.stub()
        });

        $provide.value('RouterFactory', {
            configureRoutes: sinon.stub()
        });
    }));

    beforeEach(inject(function($controller, $rootScope, _UserFactory_,
        _LoggerFactory_, _$location_, _RouterFactory_) {
        scope = $rootScope.$new();
        UserFactory = _UserFactory_;
        controller = $controller('SignupController', {
            $scope: scope,
            UserFactory: UserFactory,
            LoggerFactory: _LoggerFactory_,
            $location: _$location_
        });
    }));

    it('should have a dummy test', function() {
        expect(true).to.be.true;
    });

    it('should create SignupController instance', function() {
        expect(controller).to.exist;
    });

    // it('should call UserFactory service once', function() {
    //     scope.signup;
    //     expect(UserFactory.createUser.calledOnce).to.be.true;
    // });

});
