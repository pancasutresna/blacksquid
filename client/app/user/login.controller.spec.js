/* jshint -W117, -W030 */
describe('LoginController', function() {

    var scope;
    var LoginController;
    var RouterFactory;
    var LoggerFactory;
    var UserFactory;

    beforeEach(module('app.user'));

    beforeEach(module(function($provide) {
        $provide.constant('RouterFactory', {
            configureRoutes: sinon.stub()
        });

        $provide.constant('$cookieStore', {
            remove: sinon.stub()
        });

        $provide.constant('UserFactory', {
            authenticateUser: sinon.spy(),
            authorize: sinon.stub()
        });

        $provide.constant('IdentityFactory', sinon.stub());

        $provide.constant('LoggerFactory', {
            info: sinon.stub(),
            warning: sinon.stub()
        });
    }));

    beforeEach(inject(function($controller, $rootScope, _$http_, _$cookieStore_, _IdentityFactory_,
        _LoggerFactory_, _UserFactory_, _$location_, _RouterFactory_) {

        scope = $rootScope.$new();
        RouterFactory = _RouterFactory_;
        IdentityFactory = _IdentityFactory_;
        LoggerFactory = _LoggerFactory_;
        UserFactory = _UserFactory_;

        LoginController = $controller('LoginController', {
            $scope: scope,
            $http: _$http_,
            $cookieStore: _$cookieStore_,
            IdentityFactory: _IdentityFactory_,
            LoggerFactory: _LoggerFactory_,
            UserFactory: UserFactory,
            $location: _$location_
        });

    }));

    it('should have a dummy test', function() {
        expect(true).to.be.true;
    });

    it('should create LoginController instance', function() {
        expect(LoginController).to.exist;
    });

    // it('Should call UserFactory.authenticateUser once', function() {
    //     LoginController.signin;
    //     expect(UserFactory.authenticateUser.calledOnce).to.be.true;
    // });
});
