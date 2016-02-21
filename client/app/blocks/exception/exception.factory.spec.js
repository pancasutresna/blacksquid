/* jshint -W117, -W030 */
describe('blocks.exception', function() {

    var exception;
    var logger;

    beforeEach(module('blocks.exception'));

    beforeEach(module(function($provide) {
        $provide.constant('logger', {
            error: sinon.spy()
        });
    }));

    beforeEach(inject(function(_exception_, _logger_) {
        exception = _exception_;
        logger = _logger_;
    }));

    describe('exception', function() {
        it('should exist', function() {
            expect(exception).to.exist;
        });

        it('should contain logger', function() {
            expect(logger).to.exist;
        });
    });
});
