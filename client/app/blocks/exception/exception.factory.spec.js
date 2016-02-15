/* jshint -W117, -W030 */
describe('blocks.exception', function() {

    var ExceptionFactory;
    var LoggerFactory;

    beforeEach(module('blocks.exception'));

    beforeEach(module(function($provide) {
        $provide.constant('LoggerFactory', {
            error: sinon.spy()
        });
    }));

    beforeEach(inject(function(_ExceptionFactory_, _LoggerFactory_) {
        ExceptionFactory = _ExceptionFactory_;
        LoggerFactory = _LoggerFactory_;
    }));

    describe('ExceptionFactory', function() {
        it('should exist', function() {
            expect(ExceptionFactory).to.exist;
        });

        it('should contain LoggerFactory', function() {
            expect(LoggerFactory).to.exist;
        });
    });
});
